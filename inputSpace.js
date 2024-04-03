const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
export const inputSpace = () => {

    nameInputElement.oninput = () => {
        if (nameInputElement.value.charAt(0) === ' ') {
            nameInputElement.value = '';
        }
    }

    commitInputElement.oninput = () => {
        if (commitInputElement.value.charAt(0) === ' ') {
            commitInputElement.value = '';
        }
    }

}