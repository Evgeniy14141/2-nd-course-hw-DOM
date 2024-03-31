import { getTodos } from "./api.js";
import { postTodo } from "./api.js";
import { inputSpace } from "./inputSpace.js";

const massageSendButton = document.querySelector('.add-form-button');
const listElement = document.querySelector('.comments');
const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const loadElement = document.getElementById('loader');
const lastCommentDeleteButton = document.querySelector('.delete-last-comment');
const likeButtonElements = document.querySelectorAll('.like-button');
massageSendButton.disabled = true;


function getComments() {
    getTodos().then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, '"')
                    .replace(/&nbsp;/g, " "),
                date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                massage: comment.text
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, '"')
                    .replace(/&nbsp;/g, " "),
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



let comments = [];

const likeButtonListners = () => {
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




const editButtonListners = () => {
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            comments[editButtonElement.dataset.index].isEdit = false;
            renderComments();
        })
    }
}



const doneButtonListners = () => {
    const doneButtonElements = document.querySelectorAll(".done");
    for (const doneButtonElement of doneButtonElements) {
        doneButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const dune = doneButtonElement.dataset.index;
            const addFormTextEdit = document.querySelectorAll(".addformedit");
            comments[done].massage = addFormTextEdit[done].value;
            comments[done].isEdit = true;
            renderComments();
        })

    }
}


const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for (const quoteElement of quoteElements) {
        quoteElement.addEventListener("click", () => {
            const quote = quoteElement.dataset.index;
            commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
            renderComments();
        })
    }
}


const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        let activeLikeClass;
        if (comments[index].isLiked === true) {
            activeLikeClass = "active-like"
        } else {
            activeLikeClass = ""
        }

        let massageHideClass;
        let doneHideClass;


        return `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
            <p class ="done ${doneHideClass}" data-index="${index}"></p>
          <div class="comment-text ${massageHideClass}" data-index="${index}">
            ${comment.massage}
            <p class ="edit" data-index="${index}"></p>
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button ${activeLikeClass}" data-index="${index}" data-like="${comment.isLiked}"></button>
            </div>
        </div>
      </li>`
    }).join("")
    listElement.innerHTML = commentsHtml;

    likeButtonListners();
    editButtonListners();
    doneButtonListners();
    quoteElementsListners();

}
renderComments();




function addComment() {

    if (nameInputElement.value === "" && commitInputElement.value === "") {
        nameInputElement.classList.add("errorinput");
        commitInputElement.classList.add("errorinput");
        return
    } else if (nameInputElement.value === "") {
        nameInputElement.classList.add("errorinput");
        return
    } else if (commitInputElement.value === "") {
        commitInputElement.classList.add("errorinput");
        return
    }


    massageSendButton.disabled = true;
    massageSendButton.textContent = 'Ждите....';

    const nameValue = nameInputElement.value;
    const textValue = commitInputElement.value;

    nameInputElement.classList.remove("errorinput");
    commitInputElement.classList.remove("errorinput");


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

