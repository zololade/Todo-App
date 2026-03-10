import Page, { type PageData } from "../view/Page";
import { HomeData } from "../model/HomePage";

export const mainContainer = document.getElementById("main");

//map that contains all app view state
export const viewMap = {
  home: HomeData,
} as const;
let currentView: keyof typeof viewMap | null = null;

// builds page instance and render the page based on view map and its data
export function renderView(view: keyof typeof viewMap) {
  if (!mainContainer) return;
  if (currentView === view) return;
  currentView = view;
  renderElement(mainContainer, viewMap[view]);
}

// a utility fuction that render processed data in the supplied host
export function renderElement(host: HTMLElement, data: PageData) {
  //check if host is available
  if (!host) return;
  const render = () => {
    const fragment = Page.build(data);
    Page.render(host, fragment);
  };
  if (document.startViewTransition) {
    document.startViewTransition(render);
  } else if (!document.startViewTransition) {
    render();
  }
}
