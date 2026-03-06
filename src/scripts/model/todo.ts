export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "in-progress" | "done";

export type Activity = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // e.g. "2026-03-15"
  priority: Priority;
  status: Status;
  tags: string[];
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Build todo UI",
    description:
      "Set up the two-section layout with activity list and detail view.",
    dueDate: "2026-03-01",
    priority: "high",
    status: "in-progress",
    tags: ["dev", "frontend"],
  },
  {
    id: 2,
    title: "Write unit tests",
    description:
      "Cover the Page.build method with a few edge case tests.",
    dueDate: "2026-03-10",
    priority: "medium",
    status: "pending",
    tags: ["dev", "testing"],
  },
];
