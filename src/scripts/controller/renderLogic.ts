// import { type PageData } from "../view/Page";
import { mediaQuery, renderView } from "./renderUtility";

const mainContainer = document.getElementById("main");

window.addEventListener("load", () => {
 if (!mainContainer) return;
 renderView(mainContainer, "home");
});

const handleScreenChange = () => {
 if (!mainContainer) return;
 renderView(mainContainer, "home");
};

mediaQuery.addEventListener("change", handleScreenChange);
