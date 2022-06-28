//  Helper function that will help us select elements in the DOM
//  This function returns the DOM element with a class that is passed to this function as an argument.
function selectElementByClass(className) {
    return document.querySelector(`.${className}`);
}

//  select different sections in our web page, using the above written helper function

//  Defined an array named sections that contains all the sections in our web page and for which we have a corresponding navigation item in the navigation bar.

//  After that we have a navItems object that maps each section’s id to the corresponding item in the navigation bar.

//  create an instance of IntersectionObserver. We need to pass two arguments to the constructor of the IntersectionObserver which are:
//  A callback function
//  An options object to configure the observer instance

const sections = [
    selectElementByClass('home'),
    selectElementByClass('about'),
    selectElementByClass('products'),
    selectElementByClass('services'),
    selectElementByClass('contact'),
];

const navItems = {
    home: selectElementByClass('homeNavItem'),
    about: selectElementByClass('aboutNavItem'),
    products: selectElementByClass('productsNavItem'),
    services: selectElementByClass('servicesNavItem'),
    contact: selectElementByClass('contactNavItem'),
};


// intersection observer setup
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
};

function observerCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // get the nav item corresponding to the id of the section
            // that is currently in view
            const navItem = navItems[entry.target.id];
            // add 'active' class on the navItem
            navItem.classList.add('active');
            // remove 'active' class from any navItem that is not
            // same as 'navItem' defined above
            Object.values(navItems).forEach((item) => {
                if (item != navItem) {
                    item.classList.remove('active');
                }
            });
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((sec) => observer.observe(sec));