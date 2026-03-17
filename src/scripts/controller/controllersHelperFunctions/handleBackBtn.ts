import { mainContainer } from "../../view/renderUtilities";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleBackBtn(match: Element, _event: PointerEvent) {
  //add click event to project detail back button
  const btn = match;
  if (btn) {
    mainContainer?.classList.remove("show-detail");
    btn.setAttribute("disabled", "disabled");
  }
}
