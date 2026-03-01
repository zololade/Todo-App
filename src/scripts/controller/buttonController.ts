// import { renderView } from "./PageRender";
// import { type viewMap } from "./PageRender";

// const buttons = document.querySelectorAll<HTMLButtonElement>("nav button");

// function updateClickedButton(clickedBtn: HTMLButtonElement): void {
//  buttons.forEach((btn) => btn.classList.remove("active"));
//  clickedBtn.classList.add("active");
// }

// function isValidView(value: string | undefined): keyof viewMap {
//  return value !== undefined && value;
// }

// buttons.forEach((button) => {
//  button.addEventListener("click", (e) => {
//   let eventOwner = e.target as HTMLButtonElement;
//   updateClickedButton(eventOwner);
//   // dataset that stores what the clicked button wants in view
//   const view = eventOwner.dataset.page;

//   if (isValidView(view)) {
//    renderView(view);
//   }
//  });
// });
