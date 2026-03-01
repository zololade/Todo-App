import { activities, type Activity } from "./todo";
import type { PageData } from "../view/Page";

// The welcome message shown in Section 1 before anything is selected
export const welcomeDetail: PageData = {
 tag: "div",
 id: "activityInfo",
 content: [
  { tag: "h2", content: "Welcome to your Todo App" },
  {
   tag: "p",
   content: "Select an activity from the list to see its full details here.",
  },
 ],
};

// Builds the full detail view for a single activity (Section 1)
export function buildActivityDetail(activity: Activity): PageData {
 return [
  { tag: "h2", content: activity.title },
  { tag: "p", content: activity.description },
  { tag: "p", content: `Due: ${activity.dueDate}` },
  { tag: "p", content: `Priority: ${activity.priority}` },
  { tag: "p", content: `Status: ${activity.status}` },
  { tag: "p", content: `Tags: ${activity.tags.join(", ")}` },
 ];
}

// Builds a single list item (overview) for Section 2
function buildActivityItem(activity: Activity): PageData {
 return {
  tag: "li",
  "data-id": activity.id, // you'll use this later to know which was hovered/clicked
  content: [
   { tag: "strong", content: activity.title },
   { tag: "span", content: ` — ${activity.status} · ${activity.priority}` },
  ],
 };
}

// The full todo page data: both sections together
export const activityDetail: PageData = {
 tag: "section",
 id: "activity-detail",
 content: [
  {
   tag: "nav",
   class: "activity-nav",
   content: [{ tag: "div", content: "hello" }],
  },
  welcomeDetail,
 ], // Section 1 starts with welcome message
};

export const activitiesSection: PageData = {
 tag: "section",
 id: "activity-list",
 content: [
  { tag: "h2", content: "Your Activities" },
  {
   tag: "ul",
   content: activities.map(buildActivityItem),
  },
 ],
};

export const HomeData = [activitiesSection, activityDetail];
