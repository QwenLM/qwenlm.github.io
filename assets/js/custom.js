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