import {
  projectsDataGetter as projectsGetter,
  type Project,
} from "../store/store";
import Page, { type PageData } from "../view/Page";
import { navStateSetter } from "./projectDetailNav";

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
  navStateSetter("write");

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
      {
        tag: "strong",

        content: projectListItem.title,
      },
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
          {
            tag: "button",

            content: "+",
            id: "addProjectBtn",
          },
        ],
      },
      {
        tag: "ul",

        content: getProjectList(),
      },
    ],
  };
}

export function getProjectList() {
  return [...projectsGetter()]
    .sort((itemA, itemB) => {
      return itemB.createdAt - itemA.createdAt;
    })
    .map(projectLI);
}

function addProjectFormBuilder() {
  return [
    {
      tag: "input",

      content: "",
      placeholder: "Title field...",
      class: "mockH2",
    },
    {
      tag: "textarea",
      id: "inputPara",
      rows: "1",
      content: "",
      class: "mockP",
      placeholder: "Overview field of your current project...",
    },
    {
      class: "subTask",

      tag: "div",
      content: [
        {
          tag: "article",

          id: "article-1",
          content: [
            {
              tag: "input",

              placeholder: "Subtask field heading...",
              class: "mockH3",
              id: "subTask-1",
            },
            {
              tag: "ul",

              content: [
                {
                  tag: "li",

                  id: "task-1",
                  content: [
                    {
                      tag: "div",

                      class: "markIcon",
                      content: ".",
                    },
                    {
                      tag: "textarea",

                      rows: "1",
                      placeholder: "Task field details of current subtask... ",
                      class: "mockP",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

function buildNextSubtask(
  host: HTMLElement,
  taskId: string,
  subTaskId: string,
  articleId: string,
) {
  host.appendChild(
    Page.build([
      {
        tag: "article",

        id: articleId,
        content: [
          {
            tag: "input",

            placeholder: "Subtask field heading...",
            class: "mockH3",
            id: subTaskId,
          },
          {
            tag: "ul",

            content: [
              {
                tag: "li",

                id: taskId,
                content: [
                  {
                    tag: "div",

                    class: "markIcon",
                    content: ".",
                  },
                  {
                    tag: "textarea",
                    rows: "1",
                    placeholder: "Task field details of current subtask... ",
                    class: "mockP",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
  );
}

function buildNextTask(host: HTMLElement, taskId: string) {
  host.appendChild(
    Page.build({
      tag: "li",
      id: taskId,
      content: [
        {
          tag: "div",
          class: "markIcon",
          content: ".",
        },
        {
          tag: "textarea",
          rows: "1",
          placeholder: "Task field details of current subtask... ",
          class: "mockP",
        },
      ],
    }),
  );
}

export {
  buildNextSubtask,
  buildNextTask,
  projectTransformer,
  projectLI,
  projectListGetter,
  addProjectFormBuilder,
};
