import {
  projectsDataGetter as projectsGetter,
  resetProjects,
  addProject,
  InputData,
} from "../src/scripts/store/store";
import { describe, expect, it, beforeEach } from "vitest";
import { sampleData } from "./sampleData";

describe("taskModifier()", () => {
  const testData = [...sampleData];

  const Input: InputData = {
    title: "test project",
    overview: "this is to test if addProject() works",
    subtasks: [
      {
        title: "test project",
        tasks: ["test add project function"],
      },
      {
        title: "refactor project",
        tasks: ["refactor add project function"],
      },
    ],
  };

  const expectedOutput = {
    title: "test project",
    overview: "this is to test if addProject() works",
    flags: null,

    subtasks: expect.arrayContaining([
      expect.objectContaining({
        tasks: expect.arrayContaining([
          expect.objectContaining({
            detail: "test add project function",
            flags: null,
          }),
        ]),
        title: "test project",
      }),

      expect.objectContaining({
        tasks: expect.arrayContaining([
          expect.objectContaining({
            detail: "refactor add project function",
            flags: null,
          }),
        ]),
        title: "refactor project",
      }),
    ]),
  };

  beforeEach(() => {
    resetProjects([...testData]);
    addProject(Input);
  });

  it("should return a task object", () => {
    const receivedObject = projectsGetter().find(
      (data) => data.title === "test project",
    );

    expect(receivedObject).toEqual(expect.objectContaining(expectedOutput));
  });
});
