export function getTodos() {
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/eugeniy-chashkin/comments", {
        method: "GET",
    });

    return fetchPromise

        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            }
            return response.json();
        })


};


export function postTodo(nameValue, textValue) {

    return fetch("https://wedev-api.sky.pro/api/v1/eugeniy-chashkin/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameValue
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;")
                .replaceAll(" ", "&nbsp;"),
            text: textValue
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;")
                .replaceAll(" ", "&nbsp;"),

            forceError: false
        }),
    })
};