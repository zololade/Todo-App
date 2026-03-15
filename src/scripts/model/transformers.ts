import { projectsGetter } from "../store/project";
import { activities } from "../store/activity";
import { taskGetter } from "../store/task";
import { type PageData } from "../view/Page";
interface ProcessedData {
  id: string;
  title: string;
  overview: string;
}

export const taskBuilder = (
  activitiesData: typeof activities,
  tasksData: ReturnType<typeof taskGetter>,
  isBuildingProject: ProcessedData,
) => {
  const currentSubtask = activitiesData.find(
    (subTask) => subTask.id === isBuildingProject.id,
  );
  if (!currentSubtask) return;

  return currentSubtask.subTask
    .flatMap((element) => {
      const Tasks = tasksData.find(
        (taskIdentity) => taskIdentity.subTaskId === element.id,
      );

      if (!Tasks) return;
      if (Tasks.taskData.every((data) => data.flags?.includes("done"))) return;
      const processedTasks = Tasks.taskData.map((data) => {
        return {
          tag: "li",
          content: data.detail,
          "data-id": data.id,
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

const projectTransformer = (
  projectItem: ProcessedData | undefined,
): PageData => {
  if (!projectItem) return { tag: "p", content: "project not found" };
  const builtTask = taskBuilder(activities, taskGetter(), projectItem);
  if (!builtTask) return { tag: "p", content: "tasks not found" };
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
    },
  ];
};

// Builds a single list item (overview) for Section 2
function projectLI(projectListItem: ProcessedData): PageData {
  return {
    tag: "li",
    "data-id": projectListItem.id, // you'll use this later to know which was hovered/clicked
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
      { tag: "h2", content: "Your Projects" },
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
