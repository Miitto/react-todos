import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { Project } from "@prisma/client";

export default async function Home() {
    let project: Project | null = await prisma.project.findFirst();

    if (project) redirect(`/${project.id}`);
}
