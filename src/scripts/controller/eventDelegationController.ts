import { handleBackBtn } from "./controllersHelperFunctions/handleBackBtn";
import { handleSelectProject } from "./controllersHelperFunctions/handleSelectProject";
import { handleTaskClick } from "./controllersHelperFunctions/handleTaskClick";
import { mainContainer } from "../view/renderUtilities";
import {
  handleAddProject,
  handleMockH3Focus,
  handleTextArea,
} from "./addProjectController";

const clickHandlers = [
  { selector: "#projectInfo .subTask>article>ul>li", handler: handleTaskClick },
  { selector: "#backBtn", handler: handleBackBtn },
  { selector: "#project-list li[data-id]", handler: handleSelectProject },
  { selector: "#addProjectBtn", handler: handleAddProject },
];
const inputHandlers = [
  { selector: "#projectInfo textarea", handler: handleTextArea },
];

const focusHandlers = [
  { selector: "#projectInfo .mockH3", handler: handleMockH3Focus },
];

mainContainer?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  for (const { selector, handler } of clickHandlers) {
    const match = target.closest(selector);
    if (match) {
      handler(match, e);
      break;
    }
  }
});

mainContainer?.addEventListener("input", (e) => {
  const target = e.target as HTMLElement;
  for (const { selector, handler } of inputHandlers) {
    const match = target.closest(selector) as HTMLElement;
    if (match) {
      handler(match, e);
      break;
    }
  }
});

mainContainer?.addEventListener("focusout", (e) => {
  const target = e.target as HTMLElement;
  for (const { selector, handler } of focusHandlers) {
    const match = target.closest(selector) as HTMLElement;
    if (match) {
      handler(match, e);
      break;
    }
  }
});
