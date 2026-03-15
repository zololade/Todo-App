import {
  taskModifier,
  resetProjects,
  sampleDataGetter as projectsGetter,
} from "../src/scripts/store/store";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

describe("taskModifier()", () => {
  const tasks = {
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
          { id: "one", detail: "Revise notes", flags: ["pinned"] },
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
  };

  beforeEach(() => {
    taskModifier("xyz", "slidesId", "one", "pinned");
  });
  afterEach(() => {
    resetProjects();
  });

  it("should return a task object", () => {
    const receivedObject = projectsGetter().find((data) => data.id === "xyz");
    if (!receivedObject) return;

    expect(receivedObject).toEqual(tasks);
  });
});
