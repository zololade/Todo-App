import { activities } from "../model/todo";
import Page, { type PageData } from "../view/Page";
import { buildActivityDetail, todoPageData } from "../model/todoPage";

export const viewMap = {
 home: todoPageData,
} as const;

const mainContainer = document.getElementById("main");
const footerContainer = document.getElementById("footer");
let currentView: keyof typeof viewMap | null = null;
// a that builds page instance and render the page based on its available data
function contentDisplayer(host: HTMLElement, pageData: PageData) {
 if (!host) return;
 const render = () => {
  const fragment = Page.build(pageData);
  Page.render(host, fragment);
 };
 document.startViewTransition ? document.startViewTransition(render) : render();
}

export function renderView(view: keyof typeof viewMap) {
 if (currentView === view) return;
 currentView = view;
 if (!mainContainer) return;
 contentDisplayer(mainContainer, viewMap[view]);
}

function initialLoad() {
 if (!mainContainer || !footerContainer) return;
 renderView("home");
}
// Event Delegation for Activity Selection
mainContainer?.addEventListener("click", (e) => {
 const target = e.target as HTMLElement;
 const listItem = target.closest("li[data-id]");

 if (listItem) {
  const activityId = Number(listItem.getAttribute("data-id"));
  const activity = activities.find((a) => a.id === activityId);

  if (activity) {
   // 1. Update Active State in UI
   mainContainer
    .querySelectorAll("#activity-list li")
    .forEach((el) => el.classList.remove("active"));
   listItem.classList.add("active");

   // 2. Render Detail Panel
   const detailPanel = document.getElementById("activity-detail");
   if (detailPanel) {
    const detailData = buildActivityDetail(activity);
    contentDisplayer(detailPanel, detailData);
   }
  }
 }
});

initialLoad();
