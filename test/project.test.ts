import {
  projectModifier,
  sampleDataGetter as projectsGetter,
  resetProjects,
} from "../src/scripts/store/store";

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
              {
                id: "four",
                detail: "Print handouts for attendees",
                flags: null,
              },
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
              {
                id: "six",
                detail: "Print handouts for attendees",
                flags: null,
              },
            ],
          },
        ],
      },
    ];

    beforeEach(() => {
      projectModifier("xyz", "pinned");
    });
    afterEach(() => {
      resetProjects();
    });
    it("get modified projects flag", () => {
      expect([projectsGetter().find((data) => data.id === "xyz")]).toEqual(
        sampleProjects1,
      );
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
              {
                id: "four",
                detail: "Print handouts for attendees",
                flags: null,
              },
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
              {
                id: "six",
                detail: "Print handouts for attendees",
                flags: null,
              },
            ],
          },
        ],
      },
    ];

    beforeEach(() => {
      projectModifier("xyz", "pinned");
      projectModifier("xyz", "pinned");
    });
    afterEach(() => {
      resetProjects();
    });

    //test may fail since it is testing for the order of flags arrangement
    it("get modified projects flag", () => {
      expect([projectsGetter().find((data) => data.id === "xyz")]).toEqual(
        sampleProjects3,
      );
    });
  });
});
