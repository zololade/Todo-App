export interface Project {
  id: string;
  title: string;
  overview: string;
  flags: null | string[];
  createdAt: number;
  subtasks: {
    id: string;
    title: string;
    tasks: {
      id: string;
      detail: string;
      flags: null | string[];
    }[];
  }[];
}

export type SingleSubtask = Project["subtasks"][number];
interface Tasks {
  id: string;
  detail: string;
  flags: string[] | null;
}

export interface InputData {
  title: string;
  overview: string;
  subtasks?: {
    title: string;
    tasks?: string[];
  }[];
}
/*
====================
====  project  =====
====================
*/
const storedData =
  typeof localStorage !== "undefined" && localStorage.getItem("todoData");

let workingProjectData = !storedData ? [] : [...JSON.parse(storedData)];

export function projectsDataGetter(): Project[] {
  return workingProjectData;
}

function projectsDataSetter(newProjectsData: Project[]) {
  workingProjectData = newProjectsData;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("todoData", JSON.stringify(newProjectsData));
  }
}

export function getProject(id: string) {
  return projectsDataGetter().find((project) => project.id === id);
}

export function projectModifier(id: string, flag: string) {
  const currentProject = getProject(id);
  if (!currentProject) return;
  const projects = projectsDataGetter().map((data) => {
    if (data.id !== currentProject.id) return data;
    return {
      ...currentProject,
      flags: toggleFlag(currentProject.flags, flag),
    };
  });
  projectsDataSetter(projects);
}
/*
====================
====   tasks   =====
====================
*/

function getTask(projectId: string, subTaskId: string) {
  return projectsDataGetter()
    .find((project) => project.id === projectId)
    ?.subtasks.find((data) => data.id === subTaskId);
}

function insertTaskData(
  projectId: string,
  subTaskId: string,
  newTasks: Tasks[],
) {
  const projects = projectsDataGetter().find(
    (project) => project.id === projectId,
  );
  if (!projects) return;

  const buildSubTask = projects.subtasks.map((data) => {
    if (data.id !== subTaskId) return data;
    return {
      ...projects.subtasks.find((data) => data.id === subTaskId),
      tasks: newTasks,
    };
  });

  const buildProject = projectsDataGetter().map((project) => {
    if (project.id !== projectId) return project;
    return {
      ...projectsDataGetter().find((project) => project.id === projectId),
      subtasks: buildSubTask,
    };
  });

  projectsDataSetter(buildProject as Project[]);
}

export function taskModifier(
  projectId: string,
  subTaskId: string,
  taskId: string,
  flag: string,
) {
  const currentTask = getTask(projectId, subTaskId);
  if (!currentTask) return;
  const tasksToBeChanged = currentTask.tasks.find((data) => data.id === taskId);

  if (!tasksToBeChanged) return;

  const newTaskObject = {
    ...tasksToBeChanged,
    flags: toggleFlag(tasksToBeChanged.flags, flag),
  };

  const updatedTask = currentTask.tasks.map((data) => {
    if (data.id === taskId) return newTaskObject;
    return data;
  });

  insertTaskData(projectId, subTaskId, updatedTask);
}

/*
====================
===  add project ===
====================
*/

export function addProject(newProjectData: InputData) {
  const newSubtasks = newProjectData.subtasks && newProjectData.subtasks;
  const projId = crypto.randomUUID();
  const isBuildingSubtask =
    newSubtasks &&
    newSubtasks.map((data) => {
      const newTasks = data.tasks && data.tasks;
      return {
        id: crypto.randomUUID(),
        title: data.title,
        tasks: newTasks
          ? newTasks.map((taskDetail) => {
              return {
                id: crypto.randomUUID(),
                detail: taskDetail,
                flags: null,
              };
            })
          : [],
      };
    });

  const isBuildingProject: Project = {
    id: projId,
    title: newProjectData.title,
    overview: newProjectData.overview,
    flags: null,
    createdAt: Date.now(),
    subtasks: isBuildingSubtask ? isBuildingSubtask : [],
  };

  projectsDataSetter([...projectsDataGetter(), isBuildingProject]);
  return projId;
}

//utility
function toggleFlag(
  currentFlags: null | string[],
  flag: string,
): null | string[] {
  return !currentFlags
    ? [flag]
    : currentFlags.includes(flag)
      ? currentFlags.filter((data) => flag !== data).length === 0
        ? null
        : [...currentFlags.filter((data) => flag !== data)]
      : [flag, ...currentFlags];
}

//for testing purpose
export function resetProjects(seedData: Project[] = []) {
  workingProjectData = seedData;
}
