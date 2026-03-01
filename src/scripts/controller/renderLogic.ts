// import { type PageData } from "../view/Page";
import { activities } from "../model/todo";
import { buildActivityDetail } from "../model/todoPage";
import { mainContainer, renderElement, renderView } from "./renderUtility";

// type Activity = "activities" | "activity";
// let selectedActivity: Activity | null = null;

window.addEventListener("load", () => {
 if (!mainContainer) return;
 renderView("home");
});

// Event Delegation for Activity Selection
mainContainer?.addEventListener("click", (e) => {
 if (!mainContainer) return;
 const target = e.target as HTMLElement;
 const listItem = target.closest("li[data-id]");

 if (listItem) {
  const activityId = Number(listItem.getAttribute("data-id"));
  const activity = activities.find((a) => a.id === activityId);

  if (activity) {
   // 1. Update Active State in UI
   mainContainer
    .querySelectorAll("#activity-list li")
    .forEach((el) => el.classList.remove("active"));
   listItem.classList.add("active");
   if (window.innerWidth < 1100) {
    mainContainer.classList.toggle("show-detail");
   }
   // 2. Render Detail Panel
   const detailPanel = document.getElementById("activityInfo");
   if (detailPanel) {
    const detailData = buildActivityDetail(activity);
    renderElement(detailPanel, detailData);
   }
  }
 }
});
