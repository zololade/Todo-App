import { projects } from "./sampleDate/project";
import { activities } from "./sampleDate/activity";
import { tasks } from "./sampleDate/task";
import { type PageData } from "../view/Page";
interface ProcessedData {
  id: string;
  title: string;
  overview: string;
}

const taskBuilder = (
  activitiesData: typeof activities,
  tasksData: typeof tasks,
  isBuildingProject: ProcessedData,
) => {
  const currentSubtask = activitiesData.find(
    (subTask) => subTask.id === isBuildingProject.id,
  );
  if (!currentSubtask) return;

  return currentSubtask.subTask
    .map((element) => {
      const Tasks = tasksData.find(
        (taskIdentity) => taskIdentity.subTaskId === element.id,
      );

      if (!Tasks) return;
      const processedTasks = Tasks.taskData.map((data) => {
        return {
          tag: "p",
          content: data.detail,
        };
      });

      const result = [
        {
          tag: "h3",
          content: element.title,
        },
        {
          tag: "div",
          content: processedTasks,
        },
      ];
      return result;
    })
    .filter((data) => !!data);
};

const projectTransformer = (
  projectItem: ProcessedData | undefined,
): PageData => {
  if (!projectItem) return { tag: "p", content: "project not found" };
  const builtTask = taskBuilder(activities, tasks, projectItem);
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
    },
  ];
};

// Builds the full detail view for a single activity (Section 1)

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

const activitiesSection: PageData = {
  tag: "section",
  id: "activity-list",
  content: [
    { tag: "h2", content: "Your Activities" },
    {
      tag: "ul",
      content: projects.map(projectLI),
    },
  ],
};

export { projectTransformer, projectLI, activitiesSection };
