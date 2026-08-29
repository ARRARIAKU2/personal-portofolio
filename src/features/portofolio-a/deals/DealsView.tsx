"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LuHandshake, LuPlus } from "react-icons/lu";
import { useCollection, useCrmMutations } from "@/hooks/portofolio-a/use-crm";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { Can } from "@/features/portofolio-a/auth/guards";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Modal } from "@/components/portofolio-a/ui/Modal";
import { EmptyState } from "@/components/portofolio-a/ui/EmptyState";
import { TableSkeleton } from "@/components/portofolio-a/ui/Skeleton";
import { DEAL_STAGE } from "@/features/portofolio-a/shared/labels";
import { KanbanBoard } from "./KanbanBoard";
import { DealForm } from "./DealForm";
import type { DealFormValues } from "./schema";
import type { Deal, DealStage } from "@/types/portofolio-a";

export function DealsView() {
  const { notify } = useToast();
  const qc = useQueryClient();
  const { can } = usePermission();
  const { data = [], isLoading } = useCollection<Deal>("deals");
  const { create, update } = useCrmMutations<Deal>({
    resource: "deals",
    entityType: "deal",
  });

  const [editing, setEditing] = useState<Deal | "new" | null>(null);

  const canMove = can("deals.move");

  function moveDeal(deal: Deal, toStage: DealStage) {
    qc.setQueryData<Deal[]>(["deals"], (prev) =>
      prev?.map((d) => (d.id === deal.id ? { ...d, stage: toStage } : d))
    );
    update.mutate(
      {
        id: deal.id,
        patch: { stage: toStage, updatedAt: new Date().toISOString() },
        before: deal as unknown as Record<string, unknown>,
        action: "move_stage",
      },
      {
        onSuccess: () =>
          notify(`Moved to ${DEAL_STAGE[toStage].label}`, "info"),
        onError: () => {
          qc.invalidateQueries({ queryKey: ["deals"] });
          notify("Couldn't move deal", "error");
        },
      }
    );
  }

  function handleSubmit(values: DealFormValues) {
    const now = new Date().toISOString();
    if (editing === "new") {
      create.mutate(
        { ...values, createdAt: now, updatedAt: now } as Omit<Deal, "id">,
        {
          onSuccess: () => {
            notify("Deal created");
            setEditing(null);
          },
        }
      );
    } else if (editing) {
      update.mutate(
        {
          id: editing.id,
          patch: { ...values, updatedAt: now },
          before: editing as unknown as Record<string, unknown>,
        },
        {
          onSuccess: () => {
            notify("Deal updated");
            setEditing(null);
          },
        }
      );
    }
  }

  return (
    <div>
      <PageHeader
        title="Deals"
        subtitle={`${data.length} deals across the pipeline`}
        actions={
          <Can permission="deals.create">
            <Button onClick={() => setEditing("new")}>
              <LuPlus className="size-4" />
              New deal
            </Button>
          </Can>
        }
      />

      {isLoading ? (
        <Card className="p-4">
          <TableSkeleton rows={4} />
        </Card>
      ) : data.length === 0 ? (
        <Card>
          <EmptyState
            icon={LuHandshake}
            title="No deals in play"
            description="Create your first deal to start tracking the pipeline."
            action={
              <Can permission="deals.create">
                <Button onClick={() => setEditing("new")}>
                  <LuPlus className="size-4" />
                  New deal
                </Button>
              </Can>
            }
          />
        </Card>
      ) : (
        <KanbanBoard
          deals={data}
          canMove={canMove}
          onMove={moveDeal}
          onEdit={(d) => setEditing(d)}
        />
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "New deal" : "Edit deal"}
        description="Deals move through the pipeline stages on the board."
        size="lg"
      >
        <DealForm
          defaultValues={
            editing && editing !== "new"
              ? {
                  title: editing.title,
                  company: editing.company,
                  stage: editing.stage,
                  value: editing.value,
                  probability: editing.probability,
                  ownerId: editing.ownerId,
                  expectedClose: editing.expectedClose,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
          submitting={create.isPending || update.isPending}
          submitLabel={editing === "new" ? "Create deal" : "Save changes"}
        />
      </Modal>
    </div>
  );
}
