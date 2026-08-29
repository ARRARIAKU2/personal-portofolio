"use client";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { LuContact, LuEye, LuPencil, LuPlus, LuX } from "react-icons/lu";
import { useCollection, useCrmMutations } from "@/hooks/portofolio-a/use-crm";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { Can } from "@/features/portofolio-a/auth/guards";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Badge } from "@/components/portofolio-a/ui/Badge";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Modal } from "@/components/portofolio-a/ui/Modal";
import { DataTable } from "@/components/portofolio-a/ui/DataTable";
import { EmptyState } from "@/components/portofolio-a/ui/EmptyState";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { Field, Input, Textarea } from "@/components/portofolio-a/ui/Field";
import { ownerName } from "@/features/portofolio-a/shared/labels";
import { formatDate } from "@/lib/portofolio-a/format";
import { uid } from "@/lib/portofolio-a/id";
import { ContactForm } from "./ContactForm";
import type { ContactFormValues } from "./schema";
import type { Contact, ContactNote } from "@/types/portofolio-a";

const col = createColumnHelper<Contact>();

export function ContactsView() {
  const { user } = useAuth();
  const { notify } = useToast();
  const { can } = usePermission();
  const { data = [], isLoading } = useCollection<Contact>("contacts");
  const { update } = useCrmMutations<Contact>({
    resource: "contacts",
    entityType: "contact",
  });

  const [viewing, setViewing] = useState<Contact | null>(null);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [tagDraft, setTagDraft] = useState("");

  // Keep the open detail panel in sync with fresh query data after a mutation.
  const active = viewing ? data.find((c) => c.id === viewing.id) ?? viewing : null;

  const columns = useMemo(
    () => [
      col.accessor("name", {
        header: "Contact",
        cell: (c) => (
          <div className="flex items-center gap-2.5">
            <Avatar name={c.getValue()} size="sm" />
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                {c.getValue()}
              </div>
              <div className="text-xs text-zinc-400">{c.row.original.title}</div>
            </div>
          </div>
        ),
      }),
      col.accessor("company", { header: "Company" }),
      col.accessor("email", { header: "Email" }),
      col.accessor("ownerId", {
        header: "Owner",
        cell: (c) => (
          <span className="text-zinc-600 dark:text-zinc-300">
            {ownerName(c.getValue())}
          </span>
        ),
      }),
      col.accessor("tags", {
        header: "Tags",
        cell: (c) => (
          <div className="flex flex-wrap gap-1">
            {c.getValue().slice(0, 2).map((t) => (
              <Badge key={t} tone="zinc">
                {t}
              </Badge>
            ))}
            {c.getValue().length > 2 && (
              <span className="text-xs text-zinc-400">
                +{c.getValue().length - 2}
              </span>
            )}
          </div>
        ),
      }),
      col.display({
        id: "actions",
        header: "",
        enableHiding: false,
        cell: (c) => (
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              aria-label="View contact"
              onClick={() => setViewing(c.row.original)}
            >
              <LuEye className="size-4" />
            </Button>
          </div>
        ),
      }),
    ],
    []
  );

  function patchContact(
    contact: Contact,
    patch: Partial<Contact>,
    message: string
  ) {
    update.mutate(
      {
        id: contact.id,
        patch,
        before: contact as unknown as Record<string, unknown>,
      },
      { onSuccess: () => notify(message) }
    );
  }

  function handleEditSubmit(values: ContactFormValues) {
    if (!editing) return;
    patchContact(editing, values, "Contact updated");
    setEditing(null);
  }

  function addNote() {
    if (!active || !noteDraft.trim()) return;
    const note: ContactNote = {
      id: uid("note"),
      body: noteDraft.trim(),
      authorName: user?.name ?? "System",
      createdAt: new Date().toISOString(),
    };
    patchContact(active, { notes: [note, ...active.notes] }, "Note added");
    setNoteDraft("");
  }

  function addTag() {
    if (!active) return;
    const tag = tagDraft.trim();
    if (!tag || active.tags.includes(tag)) {
      setTagDraft("");
      return;
    }
    patchContact(active, { tags: [...active.tags, tag] }, "Tag added");
    setTagDraft("");
  }

  function removeTag(tag: string) {
    if (!active) return;
    patchContact(
      active,
      { tags: active.tags.filter((t) => t !== tag) },
      "Tag removed"
    );
  }

  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle={`${data.length} people in your network`}
      />

      <Card className="overflow-hidden">
        <DataTable
          data={data}
          columns={columns}
          loading={isLoading}
          searchPlaceholder="Search contacts, companies, emails…"
          empty={
            <EmptyState
              icon={LuContact}
              title="No contacts yet"
              description="Contacts appear here as your relationships grow."
            />
          }
        />
      </Card>

      {/* Detail panel */}
      <Modal
        open={active !== null}
        onClose={() => setViewing(null)}
        title={active?.name ?? "Contact"}
        description={active ? `${active.title} · ${active.company}` : undefined}
        size="lg"
        footer={
          active && (
            <Can permission="contacts.update">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(active);
                }}
              >
                <LuPencil className="size-4" />
                Edit details
              </Button>
            </Can>
          )
        }
      >
        {active && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Email" value={active.email} />
              <Info label="Phone" value={active.phone} />
              <Info label="Owner" value={ownerName(active.ownerId)} />
              <Info label="Added" value={formatDate(active.createdAt)} />
            </div>

            <section>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Tags
              </h4>
              <div className="flex flex-wrap items-center gap-1.5">
                {active.tags.length === 0 && (
                  <span className="text-sm text-zinc-400">No tags</span>
                )}
                {active.tags.map((t) => (
                  <span key={t} className="inline-flex items-center">
                    <Badge tone="zinc">
                      {t}
                      {can("contacts.update") && (
                        <button
                          onClick={() => removeTag(t)}
                          aria-label={`Remove ${t}`}
                          className="ml-1 text-zinc-400 hover:text-rose-500"
                        >
                          <LuX className="size-3" />
                        </button>
                      )}
                    </Badge>
                  </span>
                ))}
              </div>
              <Can permission="contacts.update">
                <div className="mt-2 flex gap-2">
                  <Input
                    value={tagDraft}
                    onChange={(e) => setTagDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add a tag…"
                    className="h-9"
                  />
                  <Button variant="secondary" size="sm" onClick={addTag}>
                    <LuPlus className="size-4" />
                    Add
                  </Button>
                </div>
              </Can>
            </section>

            <section>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Notes
              </h4>
              <Can permission="contacts.update">
                <div className="mb-3 space-y-2">
                  <Textarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Log a call, a meeting, a next step…"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={addNote}
                      disabled={!noteDraft.trim() || update.isPending}
                    >
                      Add note
                    </Button>
                  </div>
                </div>
              </Can>
              <ul className="space-y-2">
                {active.notes.length === 0 && (
                  <li className="text-sm text-zinc-400">No notes yet.</li>
                )}
                {active.notes.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-800/40"
                  >
                    <p className="text-zinc-700 dark:text-zinc-200">{n.body}</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {n.authorName} · {formatDate(n.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </Modal>

      {/* Edit form */}
      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Edit contact"
        size="lg"
      >
        {editing && (
          <ContactForm
            defaultValues={{
              name: editing.name,
              title: editing.title,
              company: editing.company,
              email: editing.email,
              phone: editing.phone,
              ownerId: editing.ownerId,
            }}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditing(null)}
            submitting={update.isPending}
          />
        )}
      </Modal>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-zinc-800 dark:text-zinc-100">{value}</div>
    </div>
  );
}
