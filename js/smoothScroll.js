
const scroll = document.querySelectorAll('.scroll');

for(let i=0; i<scroll.length; i++) {
    scroll[i].addEventListener("click", scrollClick);
}

function scrollClick(event) {
    //  Call the "smoothScroll" function
    smoothScroll(event);
    //  Active Links
    // let activeLink = document.querySelector('.nav-items li.menuLink a.active');
    // activeLink.classList.remove('active');
    // let theLink = event.currentTarget;
    // theLink.classList.add("active");
}

//  Smooth Scroll Function
function smoothScroll(event) {

    const targetId = event.currentTarget.getAttribute("href")==="#" ? "scroll" : event.currentTarget.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 70;
    const duration = 1000;
    let start = null;

    event.preventDefault();

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        // window.scrollTo(0, distance*(progress/duration) + startPosition);
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

// Easing Function
function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
}