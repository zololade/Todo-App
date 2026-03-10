import { mainContainer, renderView, viewMap } from "./renderUtility";

//select the app hearder nav buttons
const headerButtons =
  document.querySelectorAll<HTMLButtonElement>("#header nav button");

//set active on clicked button and apply style
function updateClickedButton(clickedBtn: HTMLButtonElement): void {
  headerButtons.forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
}

//check if the data to view exist in view map
function isValidView(value: string | undefined): value is keyof typeof viewMap {
  return value !== undefined && value in viewMap;
}

//add click event listener that calls updateClickButton and rerender app
headerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const eventOwner = (e.target as HTMLElement).closest("button");
    if (!eventOwner) return;
    updateClickedButton(eventOwner);
    // dataset that stores what the clicked button wants in view
    const view = eventOwner.dataset.page;

    if (isValidView(view)) {
      renderView(view);
    }
  });
});

//add click event to project detail back button
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest("#backBtn");
  if (btn) {
    mainContainer?.classList.remove("show-detail");
    btn.setAttribute("disabled", "disabled");
  }
});
