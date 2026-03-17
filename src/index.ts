import "./styles/index.css";
import { mainContainer, renderView } from "./scripts/view/renderUtilities";
import "./scripts/controller/eventDelegationController";
import "./scripts/controller/sideNavBtnController";

// initial app load render
window.addEventListener("load", () => {
  if (!mainContainer) return;
  renderView("home");
});

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
