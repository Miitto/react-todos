"use client";
import { createTask, getProject, deleteTask as dbDeleteTask } from "../db";
import { ProjectTasks as ProjectType } from "@/app/prisma";
import { Task as TaskType } from "@prisma/client";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Project({
    projectBase,
}: {
    projectBase: ProjectType | null;
}) {
    const [project, setProject] = useState<ProjectType | null>(projectBase);

    function newTask(event: React.FormEvent) {
        event.preventDefault();

        let form = event.currentTarget as HTMLFormElement;
        if (!form.reportValidity()) return;
        let data = new FormData(form);

        const name = data.get("name") as string;
        createTask(project?.id as string, name).then((task) => {
            setProject({
                ...project!,
                tasks: [...(project?.tasks ?? []), task],
            });
        });
    }

    function removeTask(taskId: string) {
        setProject({
            ...project!,
            tasks: project!.tasks.filter((task) => task.id !== taskId),
        });
    }

    return (
        <div className={styles.wrapper}>
            {(project?.tasks ?? []).map((task) => {
                return (
                    <Task
                        key={task.id}
                        task={task}
                        removeTask={removeTask}
                    />
                );
            })}
            <form onSubmit={newTask}>
                <input
                    type="text"
                    name="name"
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

function Task({
    task,
    removeTask,
}: {
    task: TaskType;
    removeTask: (taskId: string) => void;
}) {
    function deleteTask() {
        dbDeleteTask(task.id).then(() => {
            removeTask(task.id);
        });
    }

    if (!task) return null;

    return (
        <div className={styles.taskLine}>
            <p>{task.name}</p>
            <button onClick={deleteTask}>Delete</button>
        </div>
    );
}
