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
const sampleData: Project[] = [
  {
    id: "xyz",
    title: "Prepare Presentation",
    overview:
      "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
    flags: null,
    createdAt: 1773585160736,

    subtasks: [
      {
        title: "slides and notes",
        id: "slidesId",
        tasks: [
          { id: "one", detail: "Revise notes", flags: null },
          { id: "two", detail: "Simple side layouts", flags: null },
          {
            id: "three",
            detail: "Review quarterly data with olivia",
            flags: null,
          },
          { id: "four", detail: "Print handouts for attendees", flags: null },
        ],
      },
      {
        title: "preparation",
        id: "prepareId",
        tasks: [
          {
            id: "one",
            detail: "Email John for presentation tips",
            flags: null,
          },
          {
            id: "two",
            detail: "Checkout books recommendations",
            flags: null,
          },
          { id: "three", detail: "Time a full rehearsal", flags: null },
          { id: "four", detail: "Do practice run with eric", flags: null },
          { id: "five", detail: "Confirm presentation time", flags: null },
          { id: "six", detail: "Print handouts for attendees", flags: null },
        ],
      },
    ],
  },
  {
    id: "abc",
    title: "Visit Camp",
    overview: "Buy necessary camping materials, take permission from school",
    flags: null,
    createdAt: 1773604780745,

    subtasks: [
      {
        title: "Go to market",
        id: "marketId",
        tasks: [
          { id: "one", detail: "Buy tent", flags: null },
          { id: "two", detail: "Buy mushrooms", flags: null },
          {
            id: "three",
            detail: "Review plan with olivia",
            flags: null,
          },
          { id: "four", detail: "Print handouts for attendees", flags: null },
        ],
      },
      {
        title: "Preparation",
        id: "prepareId",
        tasks: [
          {
            id: "one",
            detail: "Email John to be getting his things too",
            flags: null,
          },
          {
            id: "two",
            detail: "Checkout books recommended camping site",
            flags: null,
          },
          { id: "three", detail: "Time a full rehearsal", flags: null },
          {
            id: "four",
            detail: "Do physical exercise to increase agility",
            flags: null,
          },
          { id: "five", detail: "Confirm occasion date and time", flags: null },
          {
            id: "six",
            detail: "Email attendees to cross check their materials",
            flags: null,
          },
        ],
      },
    ],
  },
];

/*
====================
====  project  =====
====================
*/

let workingProjectData = [...sampleData];
export function sampleDataGetter() {
  return workingProjectData;
}

function sampleDataSetter(newProjectsData: Project[]) {
  workingProjectData = newProjectsData;
}

function getProject(id: string) {
  return sampleDataGetter().find((project) => project.id === id);
}

export function resetProjects() {
  workingProjectData = sampleData.map((project) => project);
}

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
