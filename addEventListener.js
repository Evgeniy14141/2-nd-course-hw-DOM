import { comments, addComment } from "./main.js";
import { renderComments } from "./renderComments.js";

const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const massageSendButton = document.querySelector('.add-form-button');
const lastCommentDeleteButton = document.querySelector('.delete-last-comment');

export const addEventListener = () => {
    massageSendButton.addEventListener("click", addComment);

    nameInputElement.addEventListener("input", () => {
        massageSendButton.disabled = false;
    })

    commitInputElement.addEventListener("input", () => {
        massageSendButton.disabled = false;
    })

    lastCommentDeleteButton.addEventListener("click", () => {
        if (comments.length > 0) {
            comments.pop();
            renderComments();
        }
    });
}