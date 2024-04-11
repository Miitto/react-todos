import { Prisma, PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();

export type ProjectTasks = Prisma.ProjectGetPayload<{
    include: { tasks: true };
}>;
