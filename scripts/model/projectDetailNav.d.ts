import { type PageData } from "../view/Page";
declare let navState: "default" | "editing" | "write";
declare function navStateSetter(state: typeof navState): void;
declare function navStateGetter(): "default" | "editing" | "write";
declare function navRender(data: PageData): void;
declare function navDataBuilder(state: typeof navState): ({
    tag: string;
    content: {
        tag: string;
        height: string;
        viewBox: string;
        width: string;
        fill: string;
        content: {
            tag: string;
            d: string;
        }[];
    }[];
    id: string;
    disabled: string;
} | {
    tag: string;
    content: {
        tag: string;
        height: string;
        viewBox: string;
        width: string;
        fill: string;
        content: {
            tag: string;
            d: string;
        }[];
    }[];
    id: string;
    disabled?: never;
})[];
export { navDataBuilder, navStateSetter, navRender, navStateGetter };
//# sourceMappingURL=projectDetailNav.d.ts.map