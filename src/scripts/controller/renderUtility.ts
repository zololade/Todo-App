import Page from "../view/Page";
import { HomeData } from "../model/todoPage";

export const mediaQuery = window.matchMedia("(max-width: 1100px)");

export let currentLayout: "mobile" | "desktop" | null = null;
export function getLayoutMode(): "mobile" | "desktop" {
 return mediaQuery.matches ? "mobile" : "desktop";
}

export const viewMap = {
 home: HomeData(getLayoutMode()),
} as const;

let currentView: keyof typeof viewMap | null = null;

//builds page instance and render the page based on its available data
export function renderView(host: HTMLElement, view: keyof typeof viewMap) {
 if (currentView === view) return;
 currentView = view;
 //check if host is available
 if (!host) return;
 const render = () => {
  const fragment = Page.build(viewMap[view]);
  Page.render(host, fragment);
 };
 document.startViewTransition ? document.startViewTransition(render) : render();
}
