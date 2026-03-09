import { projects } from "./project";
import { activities } from "./activity";
import { tasks } from "./task";
// import { type PageData } from "../view/Page";
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
  let currentSubtask = activitiesData.find(
    (subTask) => subTask.id === isBuildingProject.id,
  );
  if (!currentSubtask) return;

  return currentSubtask.subTask
    .map((element) => {
      let Tasks = tasksData.find(
        (taskIdentity) => taskIdentity.subTaskId === element.id,
      );

      if (!Tasks) return;
      let processedTasks = Tasks.taskData.map((data) => {
        return {
          tag: "p",
          content: data.detail,
        };
      });

      let result = [
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
  projectStructure: typeof projects,
  activitiesData: typeof activities,
  tasksData: typeof tasks,
) => {
  let transformedProjects = projectStructure
    .map((data) => {
      let builtTask = taskBuilder(activitiesData, tasksData, data);
      if (!builtTask) return;
      return [
        { tag: "h2", content: data.title },
        {
          tag: "p",
          content: data.overview,
        },
        {
          tag: "div",
          content: builtTask,
        },
      ];
    })
    .filter((data) => !!data);

  return transformedProjects;
};

export let projectOutput = projectTransformer(
  projects,
  activities,
  tasks,
);
