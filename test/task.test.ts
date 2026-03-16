import {
  taskModifier,
  projectsDataGetter as projectsGetter,
  resetProjects,
} from "../src/scripts/store/store";
import { describe, expect, it, beforeEach } from "vitest";
import { sampleData } from "./sampleData";

describe("taskModifier()", () => {
  const testData = [...sampleData];

  const tasks = {
    ...sampleData[0],
    subtasks: [
      ...sampleData[0].subtasks.map((data) => {
        if (data.id !== "slidesId") return data;
        return {
          ...sampleData[0].subtasks[0],
          tasks: [
            ...sampleData[0].subtasks[0].tasks.map((data) => {
              if (data.id !== "one") return data;
              return { id: "one", detail: "Revise notes", flags: ["pinned"] };
            }),
          ],
        };
      }),
    ],
  };

  beforeEach(() => {
    resetProjects([...testData]);
    taskModifier("xyz", "slidesId", "one", "pinned");
  });

  it("should return a task object", () => {
    const receivedObject = projectsGetter().find((data) => data.id === "xyz");
    expect(receivedObject).toEqual(tasks);
  });
});
