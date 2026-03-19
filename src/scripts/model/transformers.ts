import {
  projectsDataGetter as projectsGetter,
  type Project,
} from "../store/store";
import { type PageData } from "../view/Page";
export function generateIdentity() {
  return crypto.randomUUID();
}

export const taskBuilder = (isBuildingProject: Project) => {
  const currentSubtask = isBuildingProject.subtasks;

  return currentSubtask
    .flatMap((element) => {
      const Tasks = element.tasks;

      if (Tasks.every((data) => data.flags?.includes("done"))) return;

      const processedTasks = Tasks.map((data) => {
        return {
          tag: "li",
          uuid: generateIdentity(),
          "data-id": data.id,
          class: data.flags?.includes("done") ? "completed" : "",
          content: [
            {
              tag: "div",
              uuid: generateIdentity(),
              class: "markIcon",
              content: data.flags?.includes("done") ? "✓" : ".",
            },
            {
              tag: "p",
              uuid: generateIdentity(),
              content: data.detail,
            },
          ],
        };
      });

      const result = {
        tag: "article",
        uuid: generateIdentity(),
        content: [
          {
            tag: "h3",
            uuid: generateIdentity(),
            content: element.title,
          },
          {
            tag: "ul",
            uuid: generateIdentity(),
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
  if (!projectItem)
    return { tag: "p", uuid: generateIdentity(), content: "project not found" };
  const builtTask = taskBuilder(projectItem);
  return [
    { tag: "h2", uuid: generateIdentity(), content: projectItem.title },
    {
      tag: "p",
      uuid: generateIdentity(),
      content: projectItem.overview,
    },
    {
      tag: "div",
      uuid: generateIdentity(),
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
    uuid: generateIdentity(),
    "data-id": projectListItem.id,
    content: [
      {
        tag: "strong",
        uuid: generateIdentity(),
        content: projectListItem.title,
      },
      {
        tag: "span",
        uuid: generateIdentity(),
        content: ` — activity.status · activity.priority`,
      },
    ],
  };
}

function projectListGetter(): PageData {
  return {
    tag: "section",
    uuid: generateIdentity(),
    id: "project-list",
    content: [
      {
        tag: "header",
        uuid: generateIdentity(),
        content: [
          { tag: "h2", uuid: generateIdentity(), content: "Your Projects" },
          { tag: "button", uuid: generateIdentity(), content: "⌕" },
          {
            tag: "button",
            uuid: generateIdentity(),
            content: "+",
            id: "addProjectBtn",
          },
        ],
      },
      {
        tag: "ul",
        uuid: generateIdentity(),
        content: [...projectsGetter()]
          .sort((itemA, itemB) => {
            return itemA.createdAt - itemB.createdAt;
          })
          .map(projectLI),
      },
    ],
  };
}

function addProjectFormBuilder() {
  return [
    {
      tag: "input",
      uuid: generateIdentity(),
      content: "",
      placeholder: "Title field...",
      class: "mockH2",
    },
    {
      tag: "textarea",
      uuid: generateIdentity(),
      rows: "1",
      content: "",
      class: "mockP",
      placeholder: "Overview field of your current project...",
    },
    {
      class: "subTask",
      uuid: generateIdentity(),
      tag: "div",
      content: [
        {
          tag: "article",
          uuid: generateIdentity(),
          id: "article-1",
          content: [
            {
              tag: "input",
              uuid: generateIdentity(),
              placeholder: "Subtask field heading...",
              class: "mockH3",
              id: "subTask-1",
            },
            {
              tag: "ul",
              uuid: generateIdentity(),
              content: [
                {
                  tag: "li",
                  uuid: generateIdentity(),
                  id: "task-1",
                  content: [
                    {
                      tag: "div",
                      uuid: generateIdentity(),
                      class: "markIcon",
                      content: ".",
                    },
                    {
                      tag: "textarea",
                      uuid: generateIdentity(),
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

export {
  projectTransformer,
  projectLI,
  projectListGetter,
  addProjectFormBuilder,
};
