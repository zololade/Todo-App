import type { PageData } from "../view/Page";
import { projectListGetter, generateIdentity } from "./transformers";

// The welcome message shown in Section 1 before anything is selected
export const welcomeDetail: PageData = {
  tag: "div",
  uuid: generateIdentity(),
  id: "projectInfo",
  content: [
    {
      tag: "h2",
      uuid: generateIdentity(),
      content: "Welcome to your Todo App",
    },
    {
      tag: "p",
      uuid: generateIdentity(),
      content: "Select an activity from the list to see its full details here.",
    },
  ],
};

// The full todo page data: both sections together
export const projectDetail: PageData = {
  tag: "section",
  uuid: generateIdentity(),
  id: "project-detail",
  content: [
    {
      tag: "nav",
      uuid: generateIdentity(),
      class: "project-detail-nav",
      content: [
        {
          tag: "button",
          uuid: generateIdentity(),
          content: "Back",
          id: "backBtn",
          disabled: "disabled",
        },
      ],
    },
    welcomeDetail,
  ], // Section 1 starts with welcome message
};

export function getHomeData(): PageData {
  return [projectListGetter(), projectDetail];
}
