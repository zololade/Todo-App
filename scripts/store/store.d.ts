export interface Project {
    id: string;
    title: string;
    overview: string;
    flags: null | string[];
    createdAt: number;
    subtasks: {
        id: string;
        title: string;
        tasks: {
            id: string;
            detail: string;
            flags: null | string[];
        }[];
    }[];
}
export type SingleSubtask = Project["subtasks"][number];
export interface InputData {
    title: string;
    overview: string;
    subtasks?: {
        title: string;
        tasks?: string[];
    }[];
}
export declare function projectsDataGetter(): Project[];
export declare function getProject(id: string): Project | undefined;
export declare function projectModifier(id: string, flag: string): void;
export declare function taskModifier(projectId: string, subTaskId: string, taskId: string, flag: string): void;
export declare function addProject(newProjectData: InputData): `${string}-${string}-${string}-${string}-${string}`;
export declare function resetProjects(seedData?: Project[]): void;
//# sourceMappingURL=store.d.ts.map