import { getTodos, postTodo } from "./api.js";
import { inputSpace } from "./inputSpace.js";
import { errorInput } from "./errorInput.js";
import { addEventListener } from "./addEventListener.js";
import { renderComments } from "./renderComments.js";



const massageSendButton = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const loadElement = document.getElementById('loader');
massageSendButton.disabled = true;



export function getComments() {
    getTodos().then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                massage: comment.text,
                likesCounter: comment.likes,
                isLiked: false,
            };
        });
    })
        .then(() => {
            renderComments();
            loadElement.classList.add('hide');
        })
        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
                return;
            }
        });
}
getComments();



inputSpace();



export let comments = [];


renderComments();




export function addComment() {

    errorInput();

    const nameValue = nameInputElement.value;
    const textValue = commitInputElement.value;

    postTodo(nameValue, textValue).then((response) => {
        if (response.status === 400 && (nameValue.length < 3 || textValue.length < 3)) {
            throw new Error("Некорректный запрос");
        }
        if (response.status === 500) {
            throw new Error("Сервер сломался");
        }
        else {
            return response.json();
        }
    })
        .then((responseData) => {
            getComments();
        })
        .then((data) => {
            massageSendButton.disabled = false;
            massageSendButton.textContent = 'Написать';
        })
        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
                nameInputElement.value = nameValue;
                commitInputElement.value = textValue;
                return;
            } if (error.message === "Некорректный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                nameInputElement.value = nameValue;
                commitInputElement.value = textValue;
            }
            if (error instanceof TypeError) {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                return;
            }
            console.log(error);
        })
        .finally(() => {
            massageSendButton.disabled = false;
            massageSendButton.textContent = 'Написать';
        });
};



addEventListener();

