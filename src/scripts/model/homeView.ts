import type { PageData } from "../view/Page";
import { navDataBuilder } from "./projectDetailNav";
import { projectListGetter } from "./transformers";

// The welcome message shown in Section 1 before anything is selected
export const welcomeDetail: PageData = {
  tag: "div",

  id: "projectInfo",
  content: [
    {
      tag: "h2",

      content: "Welcome to your Todo App",
    },
    {
      tag: "p",

      content: "Select an activity from the list to see its full details here.",
    },
  ],
};

// The full todo page data: both sections together
export const projectDetail: PageData = {
  tag: "section",

  id: "project-detail",
  content: [
    {
      tag: "nav",

      class: "project-detail-nav",
      content: navDataBuilder("default"),
    },
    welcomeDetail,
  ], // Section 1 starts with welcome message
};

export function getHomeData(): PageData {
  return [projectListGetter(), projectDetail];
}
