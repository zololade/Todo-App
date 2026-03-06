import { mainContainer, renderView, viewMap } from "./renderUtility";

const headerButtons = document.querySelectorAll<HTMLButtonElement>(
  "#header nav button",
);

function updateClickedButton(clickedBtn: HTMLButtonElement): void {
  headerButtons.forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
}

function isValidView(
  value: string | undefined,
): value is keyof typeof viewMap {
  return value !== undefined && value in viewMap;
}

headerButtons.forEach((button) => {
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

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest("#backBtn");
  if (btn) {
    mainContainer?.classList.remove("show-detail");
    btn.setAttribute("disabled", "disabled");
  }
});
