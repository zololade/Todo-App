import {
  projectModifier,
  resetProjects,
  projectsDataGetter as projectsGetter,
} from "../src/scripts/store/store";
import { describe, expect, it, beforeEach } from "vitest";
import { sampleData } from "./sampleData";

describe("projectModifier", () => {
  const testData = [...sampleData];
  describe("projectModifier(), tested with the contained project sample", () => {
    const sampleProjects1 = [{ ...sampleData[0], flags: ["pinned"] }];

    beforeEach(() => {
      resetProjects([...testData]);
      projectModifier("xyz", "pinned");
    });

    it("get modified projects flag", () => {
      expect([projectsGetter().find((data) => data.id === "xyz")]).toEqual(
        sampleProjects1,
      );
    });
  });

  describe("projectModifier(), tested with the contained project sample", () => {
    const sampleProjects3 = [{ ...sampleData[0] }];

    beforeEach(() => {
      resetProjects([...testData]);
      projectModifier("xyz", "pinned");
      projectModifier("xyz", "pinned");
    });

    //test may fail since it is testing for the order of flags arrangement
    it("get modified projects flag", () => {
      expect([projectsGetter().find((data) => data.id === "xyz")]).toEqual(
        sampleProjects3,
      );
    });
  });
});
