const { body } = document;

const changeBackground = (num) => {
    let previousBackground;

    if (body.className) {
        previousBackground = body.className;
    }

    body.className = "";
    switch (num) {
        case "1":
            return previousBackground === "bg-1" ? false : body.classList.add("bg-1");
        case "2":
            return previousBackground === "bg-2" ? false : body.classList.add("bg-2");
        case "3":
            return previousBackground === "bg-3" ? false : body.classList.add("bg-3");
        case "4":
            return previousBackground === "bg-4" ? false : body.classList.add("bg-4");
        case "5":
            return previousBackground === "bg-5" ? false : body.classList.add("bg-5");
        default:
            break;
    }
};

