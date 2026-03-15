import {
  projectModifier,
  projectsGetter,
  resetProjects,
} from "../src/scripts/store/project";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

describe("projectModifier", () => {
  describe("projectModifier(), tested with the contained project sample", () => {
    const sampleProjects1 = [
      {
        id: "xyz",
        title: "Prepare Presentation",
        overview:
          "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
        flags: ["pinned"],
        createdAt: 1773585160736,
      },
      {
        id: "abc",
        title: "Go to market",
        overview: "Activities to perform at each store in the market",
        flags: ["archived"],
        createdAt: 1773585164956,
      },
    ];

    beforeEach(() => {
      projectModifier("xyz", "pinned");
      projectModifier("abc", "archived");
    });
    afterEach(() => {
      resetProjects();
    });
    it("get modified projects flag", () => {
      expect(projectsGetter()).toEqual(sampleProjects1);
    });
  });

  describe("projectModifier(), tested with the contained project sample", () => {
    const sampleProjects2 = [
      {
        id: "xyz",
        title: "Prepare Presentation",
        overview:
          "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
        flags: null,
        createdAt: 1773585160736,
      },
      {
        id: "abc",
        title: "Go to market",
        overview: "Activities to perform at each store in the market",
        flags: ["archived", "pinned"],
        createdAt: 1773585164956,
      },
    ];

    beforeEach(() => {
      projectModifier("abc", "pinned");
      projectModifier("abc", "archived");
    });
    afterEach(() => {
      resetProjects();
    });

    //test may fail since it is testing for the order of flags arrangement
    it("get modified projects flag", () => {
      expect(projectsGetter()).toEqual(sampleProjects2);
    });
  });

  describe("projectModifier(), tested with the contained project sample", () => {
    const sampleProjects3 = [
      {
        id: "xyz",
        title: "Prepare Presentation",
        overview:
          "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
        flags: null,
        createdAt: 1773585160736,
      },
      {
        id: "abc",
        title: "Go to market",
        overview: "Activities to perform at each store in the market",
        flags: null,
        createdAt: 1773585164956,
      },
    ];

    beforeEach(() => {
      projectModifier("abc", "pinned");
      projectModifier("abc", "pinned");
    });
    afterEach(() => {
      resetProjects();
    });

    //test may fail since it is testing for the order of flags arrangement
    it("get modified projects flag", () => {
      expect(projectsGetter()).toEqual(sampleProjects3);
    });
  });
});
