"use client";
import { memo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { LuGripVertical, LuPencil } from "react-icons/lu";
import { Badge } from "@/components/portofolio-a/ui/Badge";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Can } from "@/features/portofolio-a/auth/guards";
import {
  DEAL_STAGE,
  DEAL_STAGES,
  ownerName,
} from "@/features/portofolio-a/shared/labels";
import { formatCompactCurrency } from "@/lib/portofolio-a/format";
import { cn } from "@/lib/portofolio-a/cn";
import type { Deal, DealStage } from "@/types/portofolio-a";

const CardBody = memo(function CardBody({ deal }: { deal: Deal }) {
  const meta = DEAL_STAGE[deal.stage];
  return (
    <>
      <p className="pr-14 text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
        {deal.title}
      </p>
      <p className="mt-1 text-xs text-zinc-400">{deal.company}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {formatCompactCurrency(deal.value)}
        </span>
        <span className="flex items-center gap-2 text-xs text-zinc-400">
          <Badge tone={meta.tone}>{deal.probability}%</Badge>
          <Avatar name={ownerName(deal.ownerId)} size="sm" />
        </span>
      </div>
    </>
  );
});

function DraggableCard({
  deal,
  canMove,
  onEdit,
}: {
  deal: Deal;
  canMove: boolean;
  onEdit: (d: Deal) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: deal.id,
    disabled: !canMove,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "group relative rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-shadow dark:border-zinc-800 dark:bg-zinc-900",
        isDragging && "opacity-40",
        canMove && "hover:shadow-md",
      )}
    >
      <div className="absolute right-1.5 top-1.5 flex items-center gap-0.5">
        <Can permission="deals.update">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit deal"
            onClick={() => onEdit(deal)}
            className="size-7"
          >
            <LuPencil className="size-3.5" />
          </Button>
        </Can>
        {canMove && (
          <button
            {...attributes}
            {...listeners}
            aria-label="Drag deal"
            className="inline-flex size-7 cursor-grab items-center justify-center rounded-md text-zinc-400 hover:text-zinc-600 active:cursor-grabbing dark:hover:text-zinc-200"
          >
            <LuGripVertical className="size-4" />
          </button>
        )}
      </div>
      <CardBody deal={deal} />
    </div>
  );
}

function Column({
  stage,
  deals,
  canMove,
  onEdit,
}: {
  stage: DealStage;
  deals: Deal[];
  canMove: boolean;
  onEdit: (d: Deal) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const meta = DEAL_STAGE[stage];
  const total = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Badge tone={meta.tone}>{meta.label}</Badge>
          <span className="text-xs text-zinc-400">{deals.length}</span>
        </div>
        <span className="font-mono text-xs text-zinc-400">
          {formatCompactCurrency(total)}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[120px] flex-1 flex-col gap-2 rounded-xl border border-dashed p-2 transition-colors",
          isOver
            ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/5"
            : "border-zinc-200 dark:border-zinc-800",
        )}
      >
        {deals.map((deal) => (
          <DraggableCard
            key={deal.id}
            deal={deal}
            canMove={canMove}
            onEdit={onEdit}
          />
        ))}
        {deals.length === 0 && (
          <p className="py-6 text-center text-xs text-zinc-300 dark:text-zinc-600">
            Drop deals here
          </p>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({
  deals,
  canMove,
  onMove,
  onEdit,
}: {
  deals: Deal[];
  canMove: boolean;
  onMove: (deal: Deal, toStage: DealStage) => void;
  onEdit: (deal: Deal) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const active = deals.find((d) => d.id === activeId) ?? null;

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active: a, over } = e;
    if (!over) return;
    const deal = deals.find((d) => d.id === a.id);
    const toStage = over.id as DealStage;
    if (deal && DEAL_STAGES.includes(toStage) && deal.stage !== toStage) {
      onMove(deal, toStage);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="hover-scrollbar flex gap-3 overflow-x-auto pb-4">
        {DEAL_STAGES.map((stage) => (
          <Column
            key={stage}
            stage={stage}
            deals={deals.filter((d) => d.stage === stage)}
            canMove={canMove}
            onEdit={onEdit}
          />
        ))}
      </div>
      <DragOverlay>
        {active && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.03 }}
            className="w-64 rotate-2 cursor-grabbing rounded-xl border border-emerald-300 bg-white p-3 shadow-xl dark:border-emerald-700 dark:bg-zinc-900"
          >
            <CardBody deal={active} />
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
