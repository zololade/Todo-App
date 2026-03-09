import Page, { type PageData } from "../view/Page";
import { HomeData } from "../model/todoPage";
import { projectOutput } from "../model/transformers";

console.log(Page.build(projectOutput));

export const mainContainer = document.getElementById("main");

export const viewMap = {
  home: HomeData,
} as const;
let currentView: keyof typeof viewMap | null = null;

// builds page instance and render the page based on its available data
export function renderView(view: keyof typeof viewMap) {
  if (!mainContainer) return;
  if (currentView === view) return;
  currentView = view;
  renderElement(mainContainer, viewMap[view]);
}

export function renderElement(host: HTMLElement, data: PageData) {
  //check if host is available
  if (!host) return;
  const render = () => {
    const fragment = Page.build(data);
    Page.render(host, fragment);
  };
  document.startViewTransition
    ? document.startViewTransition(render)
    : render();
}
