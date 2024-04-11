"use server";

import { prisma } from "./prisma";

export async function createProject(name: string) {
    return await prisma.project.create({
        data: {
            name,
        },
    });
}

export async function deleteProject(id: string) {
    return await prisma.project.delete({
        where: {
            id,
        },
    });
}

export async function updateProject(id: string, name: string) {
    return await prisma.project.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
}

export async function getProjects() {
    return await prisma.project.findMany();
}

export async function getProject(id: string) {
    return await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            tasks: true,
        },
    });
}

export async function createTask(projectId: string, name: string) {
    return await prisma.task.create({
        data: {
            name,
            project: {
                connect: {
                    id: projectId,
                },
            },
        },
    });
}

export async function deleteTask(id: string) {
    return await prisma.task.delete({
        where: {
            id,
        },
    });
}

export async function updateTask(id: string, name: string) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
}

export async function getTask(id: string) {
    return await prisma.task.findUnique({
        where: {
            id,
        },
    });
}

export async function getTasks() {
    return await prisma.task.findMany();
}

export async function getTasksByProject(projectId: string) {
    return await prisma.task.findMany({
        where: {
            projectId,
        },
    });
}

export async function completeTask(id: string) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            done: true,
        },
    });
}

export async function uncompleteTask(id: string) {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            done: false,
        },
    });
}
