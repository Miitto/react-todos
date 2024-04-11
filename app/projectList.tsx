"use client";

import { Project } from "@prisma/client";
import { useRef, useState } from "react";
import styles from "./projectList.module.scss";
import { createProject } from "./db";

import { usePathname } from "next/navigation";

export default function ProjectList({ props }: { props: { projects: any } }) {
    const [projects, setProjects] = useState(props.projects);
    const pathname = usePathname();

    const dialog = useRef<HTMLDialogElement>(null);

    function showNewProjectDialog() {
        dialog.current?.showModal();
    }

    function hideNewProjectDialog() {
        dialog.current?.close();
    }

    function dialogClick(event: React.MouseEvent) {
        if (event.target === dialog.current) {
            hideNewProjectDialog();
            event.stopPropagation();
        }
    }

    function newProject(event: React.FormEvent) {
        event.preventDefault();

        let form = event.currentTarget as HTMLFormElement;
        if (!form.reportValidity()) return;
        let data = new FormData(form);

        const name = data.get("name") as string;
        createProject(name).then((project) => {
            setProjects([...projects, project]);
            hideNewProjectDialog();
        });
    }

    return (
        <div className={styles.wrapper}>
            {projects.map((project: Project) => {
                return (
                    <a
                        className={
                            styles.link +
                            (pathname === `/${project.id}`
                                ? " " + styles.active
                                : "")
                        }
                        key={project.id}
                        href={`/${project.id}`}
                    >
                        {project.name}
                    </a>
                );
            })}
            <button onClick={showNewProjectDialog}>+</button>
            <dialog
                ref={dialog}
                onClick={dialogClick}
                className={styles.dialog}
            >
                <form onSubmit={newProject}>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        name="name"
                    />
                    <button>Save</button>
                </form>
            </dialog>
        </div>
    );
}
