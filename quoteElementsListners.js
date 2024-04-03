import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

const commitInputElement = document.querySelector('.add-form-text');
export const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for (const quoteElement of quoteElements) {
        quoteElement.addEventListener("click", () => {
            const quote = quoteElement.dataset.index;
            commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
            renderComments();
        })
    }
}

