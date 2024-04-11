import { createTask, getProject, deleteTask as dbDeleteTask } from "../db";
import Project from "./Project";

export async function getInitialProps() {}

export default async function Get({ params }: { params: { id: string } }) {
    const { id } = params;
    let proj = await getProject(id as string);
    return <Project projectBase={proj} />;
}
