/* eslint-disable @typescript-eslint/no-unused-vars */
import { addProjectFormBuilder } from "../model/transformers";
import { type InputData } from "../store/store";
import Page from "../view/Page";
import { mainContainer, renderElement } from "../view/renderUtilities";

let formState: InputData | null = null;
function getForm() {
  return formState;
}

function setForm(data: InputData) {
  formState = data;
}

export function handleAddProject(_match: Element, _e: PointerEvent) {
  if (window.matchMedia("(width <= 1100px)").matches) {
    mainContainer?.classList.toggle("show-detail");
    document.querySelector("#backBtn")?.removeAttribute("disabled");
  }

  const detailPanel = document.getElementById("projectInfo");
  if (detailPanel) {
    const detailData = addProjectFormBuilder();
    renderElement(detailPanel, detailData);
  }

  setForm({
    title: "",
    overview: "",
    subtasks: [
      {
        title: "",
        tasks: [""],
      },
    ],
  });
}
export function handleTextArea(match: HTMLElement, _e: Event) {
  match.style.height = `${match.scrollHeight}px`;
}

export function handleMockH3Focus(match: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  const parent = target.closest(".subTask");
  const subtaskTag = match as HTMLTextAreaElement;
  const taskValues = subtaskTag.querySelector("textarea")?.value;

  if (subtaskTag.value === "") return;
  const currentForm = getForm();
  const otherSubtasks = currentForm?.subtasks;
  if (!currentForm || !parent) return;
  if (parent.childElementCount === 1) {
    console.log("hello");
    setForm({
      ...currentForm,
      subtasks: [
        {
          title: subtaskTag.value,
          tasks: [...(taskValues || [])],
        },
      ],
    });
  } else {
    setForm({
      ...currentForm,
      subtasks: [
        ...(otherSubtasks || []),
        {
          title: subtaskTag.value,
          tasks: [...(taskValues || [])],
        },
      ],
    });
  }

  console.log(getForm());
  parent.appendChild(
    Page.build([
      {
        tag: "article",
        content: [
          {
            tag: "input",
            placeholder: "Subtask field heading...",
            class: "mockH3",
          },
          {
            tag: "ul",
            content: [
              {
                tag: "li",
                content: [
                  { tag: "div", class: "markIcon", content: "." },
                  {
                    tag: "textarea",
                    rows: "1",
                    placeholder: "Task field details of current subtask... ",
                    class: "mockP",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
  );
}
