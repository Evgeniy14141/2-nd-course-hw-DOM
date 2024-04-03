import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

export const likeButtonListners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', event => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;

            if (comments[index].isLiked === false) {
                comments[index].likesCounter = comments[index].likesCounter + 1;
                comments[index].isLiked = true;

            } else {
                comments[index].isLiked = false;
                comments[index].likesCounter = comments[index].likesCounter - 1;

            }
            renderComments();

        })
    }
}


