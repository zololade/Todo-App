import Page, { type PageData } from "../view/Page";
import { getHomeData } from "../model/homeView";

export const mainContainer = document.getElementById("main");

//map that contains all app view state
export const viewMap = {
  home: getHomeData,
} as const;
let currentView: keyof typeof viewMap | null = null;

// builds page instance and render the page based on view map and its data
export function renderView(view: keyof typeof viewMap) {
  if (!mainContainer) return;
  if (currentView === view) return;
  currentView = view;
  const fromRenderView = true;
  renderElement(mainContainer, viewMap[view](), fromRenderView);
}

// a utility function that render processed data in the supplied host
export function renderElement(
  host: HTMLElement,
  data: PageData,
  skipDiff?: boolean,
) {
  //check if host is available
  if (!host) return;
  const render = () => {
    if (skipDiff) {
      const fragment = Page.build(data);
      Page.pureRender(host, fragment);
    } else {
      Page.snapshotRender(host, data);
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(render);
  } else {
    render();
  }
}
