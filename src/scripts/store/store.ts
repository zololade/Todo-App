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

interface Tasks {
  id: string;
  detail: string;
  flags: string[] | null;
}
/*
====================
====  project  =====
====================
*/
const storedData = localStorage.getItem("todoData");

let workingProjectData = !storedData ? [] : [...JSON.parse(storedData)];
console.log(workingProjectData);
export function sampleDataGetter(): Project[] {
  return workingProjectData;
}

function sampleDataSetter(newProjectsData: Project[]) {
  workingProjectData = newProjectsData;
  localStorage.setItem("todoData", JSON.stringify(newProjectsData));
}

function getProject(id: string) {
  return sampleDataGetter().find((project) => project.id === id);
}

// export function resetProjects() {
//   workingProjectData = sampleData.map((project) => project);
// }

export function projectModifier(id: string, flag: string) {
  const currentProject = getProject(id);
  if (!currentProject) return;
  const projects = sampleDataGetter().map((data) => {
    if (data.id !== currentProject.id) return data;
    return {
      ...currentProject,
      flags: toggleFlag(currentProject.flags, flag),
    };
  });
  sampleDataSetter(projects);
}
/*
====================
====   tasks   =====
====================
*/

function getTask(projectId: string, subTaskId: string) {
  return sampleDataGetter()
    .find((project) => project.id === projectId)
    ?.subtasks.find((data) => data.id === subTaskId);
}

function insertTaskData(
  projectId: string,
  subTaskId: string,
  newTasks: Tasks[],
) {
  const projects = sampleDataGetter().find(
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

  const buildProject = sampleDataGetter().map((project) => {
    if (project.id !== projectId) return project;
    return {
      ...sampleDataGetter().find((project) => project.id === projectId),
      subtasks: buildSubTask,
    };
  });

  sampleDataSetter(buildProject as Project[]);
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
