import { renderView, viewMap } from "./renderUtility";

const buttons = document.querySelectorAll<HTMLButtonElement>("nav button");

function updateClickedButton(clickedBtn: HTMLButtonElement): void {
 buttons.forEach((btn) => btn.classList.remove("active"));
 clickedBtn.classList.add("active");
}

function isValidView(value: string | undefined): value is keyof typeof viewMap {
 return value !== undefined && value in viewMap;
}

buttons.forEach((button) => {
 button.addEventListener("click", (e) => {
  let eventOwner = e.target as HTMLButtonElement;
  updateClickedButton(eventOwner);
  // dataset that stores what the clicked button wants in view
  const view = eventOwner.dataset.page;

  if (isValidView(view)) {
   renderView(view);
  }
 });
});
