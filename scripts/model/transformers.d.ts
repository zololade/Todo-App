import { type Project } from "../store/store";
import { type PageData } from "../view/Page";
export declare const taskBuilder: (isBuildingProject: Project) => {
    tag: string;
    content: ({
        tag: string;
        content: string;
    } | {
        tag: string;
        content: {
            tag: string;
            "data-id": string;
            class: string;
            content: ({
                tag: string;
                class: string;
                content: string;
            } | {
                tag: string;
                content: string;
                class?: never;
            })[];
        }[];
    })[];
    "data-id": string;
}[];
declare const projectTransformer: (projectItem: Project | undefined) => PageData;
declare function projectLI(projectListItem: Project): PageData;
declare function projectListGetter(): PageData;
export declare function getProjectList(): PageData[];
declare function addProjectFormBuilder(): ({
    tag: string;
    content: string;
    placeholder: string;
    class: string;
    id?: never;
    rows?: never;
} | {
    tag: string;
    id: string;
    rows: string;
    content: string;
    class: string;
    placeholder: string;
} | {
    class: string;
    tag: string;
    content: {
        tag: string;
        id: string;
        content: ({
            tag: string;
            placeholder: string;
            class: string;
            id: string;
            content?: never;
        } | {
            tag: string;
            content: {
                tag: string;
                id: string;
                content: ({
                    tag: string;
                    class: string;
                    content: string;
                    rows?: never;
                    placeholder?: never;
                } | {
                    tag: string;
                    rows: string;
                    placeholder: string;
                    class: string;
                    content?: never;
                })[];
            }[];
            placeholder?: never;
            class?: never;
            id?: never;
        })[];
    }[];
    placeholder?: never;
    id?: never;
    rows?: never;
})[];
declare function buildNextSubtask(host: HTMLElement, taskId: string, subTaskId: string, articleId: string): HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement | Text;
declare function buildNextTask(host: HTMLElement, taskId: string): HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement | Text;
export { buildNextSubtask, buildNextTask, projectTransformer, projectLI, projectListGetter, addProjectFormBuilder, };
//# sourceMappingURL=transformers.d.ts.map