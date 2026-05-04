import { type PageData } from "./Page";
import { getHomeData } from "../model/homeView";
export declare const mainContainer: HTMLElement | null;
export declare const viewMap: {
    readonly home: typeof getHomeData;
};
export declare function renderView(view: keyof typeof viewMap): void;
export declare function renderElement(host: HTMLElement, data: PageData, skipDiff?: boolean, afterRender?: () => void): void;
//# sourceMappingURL=renderUtilities.d.ts.map