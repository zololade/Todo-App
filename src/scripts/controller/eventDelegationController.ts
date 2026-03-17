import { handleBackBtn } from "./controllersHelperFunctions/handleBackBtn";
import { handleSelectProject } from "./controllersHelperFunctions/handleSelectProject";
import { handleTaskClick } from "./controllersHelperFunctions/handleTaskClick";
import { mainContainer } from "../view/renderUtilities";

const handlers = [
  { selector: "#projectInfo .subTask>article>ul>li", handler: handleTaskClick },
  { selector: "#backBtn", handler: handleBackBtn },
  { selector: "#project-list li[data-id]", handler: handleSelectProject },
];

mainContainer?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  for (const { selector, handler } of handlers) {
    const match = target.closest(selector);
    if (match) {
      handler(match, e);
      break;
    }
  }
});
