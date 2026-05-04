export type ElementObject = {
    tag: string;
    content?: string | PageData[];
    [key: string]: unknown;
};
export type PageData = ElementObject | PageData[] | string | number;
export default class Page {
    private static DOM_RECORD;
    static isObject(value: unknown): value is ElementObject;
    static build(incomingObject: PageData): HTMLElement | DocumentFragment | SVGSVGElement | SVGPathElement | Text;
    static snapshotRender(currentHost: HTMLElement, elem: PageData): void;
    static pureRender(host: HTMLElement, elem: HTMLElement | DocumentFragment | Text | SVGSVGElement | SVGPathElement): void;
}
//# sourceMappingURL=Page.d.ts.map