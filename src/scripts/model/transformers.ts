import {
  projectsDataGetter as projectsGetter,
  type Project,
} from "../store/store";
import { type PageData } from "../view/Page";

export const taskBuilder = (isBuildingProject: Project) => {
  const currentSubtask = isBuildingProject.subtasks;

  return currentSubtask
    .flatMap((element) => {
      const Tasks = element.tasks;

      if (Tasks.every((data) => data.flags?.includes("done"))) return;

      const processedTasks = Tasks.map((data) => {
        return {
          tag: "li",
          "data-id": data.id,
          class: data.flags?.includes("done") ? "completed" : "",
          content: [
            {
              tag: "div",
              class: "markIcon",
              content: data.flags?.includes("done") ? "✓" : ".",
            },
            {
              tag: "p",
              content: data.detail,
            },
          ],
        };
      });

      const result = {
        tag: "article",
        content: [
          {
            tag: "h3",
            content: element.title,
          },
          {
            tag: "ul",
            content: processedTasks,
          },
        ],
        "data-id": element.id,
      };
      return result;
    })
    .filter((data) => !!data);
};

const projectTransformer = (projectItem: Project | undefined): PageData => {
  if (!projectItem) return { tag: "p", content: "project not found" };
  const builtTask = taskBuilder(projectItem);
  return [
    { tag: "h2", content: projectItem.title },
    {
      tag: "p",
      content: projectItem.overview,
    },
    {
      tag: "div",
      content: builtTask,
      class: "subTask",
      "data-id": projectItem.id,
    },
  ];
};

// Builds a single list item (overview) for Section 2
function projectLI(projectListItem: Project): PageData {
  return {
    tag: "li",
    "data-id": projectListItem.id,
    content: [
      { tag: "strong", content: projectListItem.title },
      {
        tag: "span",
        content: ` — activity.status · activity.priority`,
      },
    ],
  };
}

function projectListGetter(): PageData {
  return {
    tag: "section",
    id: "project-list",
    content: [
      {
        tag: "header",
        content: [
          { tag: "h2", content: "Your Projects" },
          { tag: "button", content: "⌕" },
          { tag: "button", content: "+", id: "addProjectBtn" },
        ],
      },
      {
        tag: "ul",
        content: [...projectsGetter()]
          .sort((itemA, itemB) => {
            return itemA.createdAt - itemB.createdAt;
          })
          .map(projectLI),
      },
    ],
  };
}

export { projectTransformer, projectLI, projectListGetter };
