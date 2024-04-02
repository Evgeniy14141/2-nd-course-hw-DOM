const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const massageSendButton = document.querySelector('.add-form-button');

export const errorInput = () => {
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


    nameInputElement.classList.remove("errorinput");
    commitInputElement.classList.remove("errorinput");

}