import { handleBackBtn } from "./controllersHelperFunctions/handleBackBtn";
import { handleSelectProject } from "./controllersHelperFunctions/handleSelectProject";
import { handleTaskClick } from "./controllersHelperFunctions/handleTaskClick";
import { mainContainer } from "../view/renderUtilities";
import {
  handleAddProject,
  handleMockH3Input,
  handleSaveBtn,
  handleSubTaskMockPInput,
  handleTextArea,
} from "./addProjectController";

const clickHandlers = [
  { selector: "#projectInfo .subTask>article>ul>li", handler: handleTaskClick },
  { selector: "#backBtn", handler: handleBackBtn },
  { selector: "#saveBtn", handler: handleSaveBtn },
  { selector: "#project-list li[data-id]", handler: handleSelectProject },
  { selector: "#addProjectBtn", handler: handleAddProject },
];

const inputHandlers = [
  {
    selector: ".subTask>article>ul>li>textarea",
    handler: handleSubTaskMockPInput,
  },
  { selector: "#projectInfo>.mockP", handler: handleTextArea },
  { selector: "#projectInfo .subTask .mockH3", handler: handleMockH3Input },
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
