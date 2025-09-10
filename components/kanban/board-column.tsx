import { Task } from "@/lib/store";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ColumnActions } from "./column-action";
import { TaskCard } from "./task-card";

/**
 * Represents a column on the board.
 */
export interface Column {
  id: UniqueIdentifier;
  title: string;
}

/**
 * The type of a column.
 */
export type ColumnType = "Column";

/**
 * The data for a dragged column.
 */
export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

/**
 * Props for the BoardColumn component.
 */
interface BoardColumnProps {
  /**
   * The column to be displayed.
   */
  column: Column;
  /**
   * The tasks in the column.
   */
  tasks: Task[];
  /**
   * Whether the column is an overlay.
   */
  isOverlay?: boolean;
}

/**
 * A component that displays a column on the board.
 * @param {BoardColumnProps} props - The props for the component.
 * @returns {JSX.Element} The board column component.
 */
export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-[70vh] max-h-[70vh] w-[350px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button>
        {/* <span className="mr-auto !mt-0"> {column.title}</span> */}
        {/* <Input
          defaultValue={column.title}
          className="text-base !mt-0 mr-auto"
        /> */}
        <ColumnActions id={column.id} title={column.title} />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
}

/**
 * A container for the board columns.
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The board container component.
 */
export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva(
    "overflow-x-auto px-2  pb-4 md:px-0 flex lg:justify-start",
    {
      variants: {
        dragging: {
          default: "snap-x snap-mandatory",
          active: "snap-none",
        },
      },
    },
  );

  return (
    <div
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-start flex-row justify-center">
        {children}
      </div>
    </div>
  );
}
