const laxCta = document.getElementsByClassName('laxCtaImage');
const image = document.getElementsByClassName('thumbnail');
const pageHeader = document.getElementsByClassName('pageHeader');
// new simpleParallax(image);
new simpleParallax(laxCta);
new simpleParallax(image, {
    delay: 0,
    orientation: 'down',
    scale: 1.3,
    overflow: false
});

new simpleParallax(pageHeader, {
    delay: 0,
    orientation: 'down',
    scale: 1.3,
    overflow: false
});