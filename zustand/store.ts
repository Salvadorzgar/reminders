import { create } from "zustand";

export type Task = {
    id: number;
    task: string;
    task_description: string;
    completed: 0 | 1;
    createdAt: string;
    updatedAt: string;
};

export interface TaskStore {
    completedTasks: Task[];
    todoTasks: Task[];
    setTasks: (tasks: Task[]) => void;
    setTodoTasks: (tasks: Task[]) => void;
    triggerUpdate: boolean;
    setTriggerUpdate: () => void;
    // addTodoTask: (task: Task) => void;
    // addCompletedTask: (task: Task) => void;
}

const useTaskStore = create<TaskStore>()((set) => ({
    completedTasks: [],
    todoTasks: [],
    triggerUpdate: false,
    setTasks: (payload: Task[]) => set((state) => ({
        completedTasks: payload.filter((task) => task.completed),
        todoTasks: payload.filter((task) => !task.completed),
    })),
    setTodoTasks: (tasks: Task[]) => set(() => ({
        todoTasks: tasks,
    })),
    setTriggerUpdate: () => set((state) => ({
        triggerUpdate: !state.triggerUpdate,
    }))
    // addCompletedTask: (task: Task) => set((state) => ({
    //     completedTasks: [task, ...state.completedTasks],
    //     todoTasks: state.todoTasks.filter((tsk) => task.id !== tsk.id)
    // })),
    // addTodoTask: () => set(),
}))

export default useTaskStore;