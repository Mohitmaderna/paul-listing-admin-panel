import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "@/components/kanban/board-column";
import { TaskDragData } from "@/components/kanban/task-card";

/**
 * A type for the data of a draggable item.
 */
type DraggableData = ColumnDragData | TaskDragData;

/**
 * A utility function for combining class names.
 * @param {...ClassValue[]} inputs - The class names to combine.
 * @returns {string} The combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A utility function for checking if a draggable item has data.
 * @template T - The type of the draggable item.
 * @param {T | null | undefined} entry - The draggable item.
 * @returns {entry is T & { data: DataRef<DraggableData> }} Whether the draggable item has data.
 */
export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}
