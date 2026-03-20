import Page, { type PageData } from "../view/Page";

let navState: "default" | "editing" | "write" = "default";

function navStateSetter(state: typeof navState) {
  navState = state;
  navRender(navDataBuilder(state)); // always called after state update
}

function navStateGetter() {
  return navState;
}

function navRender(data: PageData) {
  const host = document.querySelector(".project-detail-nav") as HTMLElement;
  if (!host) return;
  const fragment = Page.build(data);
  Page.pureRender(host, fragment);
}

function navDataBuilder(state: typeof navState) {
  const bigScreen = window.matchMedia("(width >= 1100px)").matches;

  return [
    {
      tag: "button",
      content: [
        {
          tag: "svg",
          height: "24px",
          viewBox: "0 -960 960 960",
          width: "24px",
          fill: "currentColor",
          content: [
            {
              tag: "path",
              d: "M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z",
            },
          ],
        },
      ],
      id: "backBtn",

      disabled: bigScreen ? "disabled" : "",
    },
    state !== "default" && {
      tag: "button",
      content: [
        {
          tag: "svg",
          height: "24px",
          viewBox: "0 -960 960 960",
          width: "24px",
          fill: "currentColor",
          content: [
            {
              tag: "path",
              d:
                state === "write"
                  ? "M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"
                  : "m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z",
            },
          ],
        },
      ],
      id: state === "write" ? "editBtn" : "saveBtn",
    },
  ].filter((data) => data !== false);
}

export { navDataBuilder, navStateSetter, navRender, navStateGetter };
