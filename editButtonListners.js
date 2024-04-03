import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

export const editButtonListners = () => {
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            comments[editButtonElement.dataset.index].isEdit = false;
            renderComments();
        })
    }
}