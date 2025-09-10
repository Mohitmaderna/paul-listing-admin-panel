import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";
import { Column } from "@/components/kanban/board-column";
import { UniqueIdentifier } from "@dnd-kit/core";

/**
 * The status of a task.
 */
export type Status = "TODO" | "IN_PROGRESS" | "DONE";

/**
 * The default columns for the board.
 */
const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
] satisfies Column[];

/**
 * The ID of a column.
 */
export type ColumnId = (typeof defaultCols)[number]["id"];

/**
 * A task on the board.
 */
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

/**
 * The state of the task store.
 */
export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

/**
 * The actions for the task store.
 */
export type Actions = {
  addTask: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

/**
 * A Zustand store for managing tasks.
 */
export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      columns: defaultCols,
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: "TODO" },
          ],
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col,
          ),
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [...state.columns, { id: uuid(), title }],
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
    }),
    { name: "task-store", skipHydration: true },
  ),
);
