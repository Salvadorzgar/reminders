import * as SQLite from "expo-sqlite";
import { getCurrentDateTime } from "./utils";
import { Task } from "./zustand/store";

const db = SQLite.openDatabaseSync("doit.db");

export async function createDatabase() {
    try {
        const result = await db.execAsync(`
            create table if not exists task (
                id integer primary key autoincrement,
                task text not null,
                task_description text,
                completed integer not null default 0,
                createdAt datetime default current_timestamp,
                updatedAt datetime
            );
            create table if not exists subtask (
                id integer auto_increment not null primary key,
                task text not null,
                task_description text,
                completed integer not null default 0,
                createdAt datetime default current_timestamp,
                updatedAt datetime,
                taskId integer not null,
                foreign key (taskId) references task(id) on delete cascade
            );
        `);
        console.log(result);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function createTask(title: string, description: string, completed: boolean) {
    try {
        const result = await db.runAsync('insert into task (task, task_description, completed) values (?, ?, ?)', title, description, (completed ? 1 : 0));
        console.log(result);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function createSubtask(id: number, title: string, description: string, completed: boolean) {
    try {
        const result = await db.runAsync('insert into subtask (task, task_description, completed, taskId) values (?, ?, ?, ?)', title, description, completed ? 1 : 0, id);
        console.log(result);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function completeTask(id: number, isSubtask: boolean, completed: boolean) {
    try {
        const table = isSubtask ? 'subtask' : 'task';
        const result = await db.runAsync(`update ${table} set completed = ?, updatedAt = ? where id = ?`, (completed ? 1 : 0), getCurrentDateTime(), id);
        console.log(result);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function updateTask(id: number, isSubtask: boolean, title: string, desc: string) {
    try {
        const table = isSubtask ? 'subtask' : 'task';
        const result = await db.runAsync(`update ${table} set task = ?, task_description = ?, updatedAt = ? where id = ?`, title, desc, getCurrentDateTime(),id);
        console.log(result);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function getTasks(): Promise<Task[]> {
    try {
        const tasks = await db.getAllAsync('select * from task order by createdAt desc');
        return tasks as Task[];
    } catch (error) {
        console.log(error);
        return [];
    }
}