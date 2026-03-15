import {
  taskModifier,
  taskGetter,
  resetTasks,
} from "../src/scripts/store/task";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

describe("taskModifier()", () => {
  const tasks = {
    subTaskId: "prepareId",
    taskData: [
      {
        id: "one",
        detail: "Email John for presentation tips",
        flags: ["pinned"],
      },
      { id: "two", detail: "Checkout books recommendations", flags: null },
      { id: "three", detail: "Time a full rehearsal", flags: null },
      { id: "four", detail: "Do practice run with eric", flags: null },
      { id: "five", detail: "Confirm presentation time", flags: null },
      { id: "six", detail: "Print handouts for attendees", flags: null },
    ],
  };
  beforeEach(() => {
    taskModifier("prepareId", "one", "pinned");
  });
  afterEach(() => {
    resetTasks();
  });

  it("should return a task object", () => {
    expect(
      taskGetter().filter((data) => {
        return data.subTaskId === tasks.subTaskId;
      })[0],
    ).toEqual(tasks);
  });
});
