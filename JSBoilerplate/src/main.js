
import  "./main.css";
const red = "color: red;";
const blue = "color: blue;";
const top = document.createElement("div");
top.innerText = "Top of Component";
top.style = red;
const bottom = document.createElement("div");
bottom.innerText = "Bottom of Component";
bottom.style = blue;

const main = document.createElement("main");
main.appendChild(top);
main.appendChild(bottom);

export { top, bottom, main };
