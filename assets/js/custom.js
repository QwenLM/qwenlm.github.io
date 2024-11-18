const navHeight = 60;

/* Transition effect for navbar */
document.addEventListener('scroll', (e) => {
    /* checks if window is scrolled more than navHeight px, adds/removes bg-white and shadow class */
    const nav = document.querySelector('.nav-container');
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    if (scrollTop > navHeight) {
        nav.className = 'nav-container shadow'
    } else {
        if (hasHeaderBg) {
            nav.className = 'nav-container nav-background'
        } else {
            nav.className = 'nav-container'
        }
    }
});

/* example gallery */
document.addEventListener('DOMContentLoaded', function () {
    const examples = document.querySelectorAll(".example-container");
    examples.forEach((example) => {
        const elements = example.querySelectorAll(".example-content");
        if (elements.length === 1) {
            const next = elements[0].querySelector(".next-button");
            if (next) {
                next.style.display = "none";
            }
            return
        }
        for (let i = 0; i < elements.length; i++) {
            const ele = elements[i];
            const nexti = i + 1 === elements.length ? 0 : i + 1;
            const next_ele = elements[nexti];
            const title = ele.querySelector(".title").firstElementChild;
            const title_text = `${title.textContent} (${i + 1}/${elements.length})`
            title.textContent = title_text;
            const button = ele.querySelector(".next-button");
            button.addEventListener("click", (e) => {
                e.preventDefault();
                ele.style.display = "none";
                next_ele.style.display = "block"
            })
        }
    })
});