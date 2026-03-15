//sample data
interface SingleTask {
  id: string;
  detail: string;
  flags: null | string[];
}
interface TaskStructure {
  subTaskId: string;
  taskData: SingleTask[];
}

const initialTasks: TaskStructure[] = [
  {
    subTaskId: "slidesId",
    taskData: [
      { id: "one", detail: "Revise notes", flags: null },
      { id: "two", detail: "Simple side layouts", flags: null },
      { id: "three", detail: "Review quarterly data with olivia", flags: null },
      { id: "four", detail: "Print handouts for attendees", flags: null },
    ],
  },
  {
    subTaskId: "prepareId",
    taskData: [
      {
        id: "one",
        detail: "Email John for presentation tips",
        flags: null,
      },
      { id: "two", detail: "Checkout books recommendations", flags: null },
      { id: "three", detail: "Time a full rehearsal", flags: null },
      { id: "four", detail: "Do practice run with eric", flags: null },
      { id: "five", detail: "Confirm presentation time", flags: null },
      { id: "six", detail: "Print handouts for attendees", flags: null },
    ],
  },
];

let tasks = [...initialTasks];

export function taskModifier(subTaskId: string, taskId: string, flag: string) {
  const currentTask = tasks.find((arr) => subTaskId === arr.subTaskId);
  const currentTaskId = currentTask?.subTaskId;

  tasks = tasks.map((task) => {
    if (task.subTaskId !== currentTaskId) return task;

    const newTaskData = task.taskData.map((data) => {
      if (data.id !== taskId) return data;

      return {
        ...data,
        flags: data.flags
          ? data.flags?.includes(flag)
            ? data.flags.filter((data) => data !== flag)
            : [...data.flags, flag]
          : [flag],
      };
    });
    return { ...task, taskData: newTaskData };
  });
}

export function taskGetter() {
  return tasks;
}

//for testing purpose
export function resetTasks() {
  tasks = initialTasks.map((t) => ({ ...t, taskData: [...t.taskData] }));
}
