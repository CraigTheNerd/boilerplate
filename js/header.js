// When window is scrolled
window.addEventListener('scroll', function() {
	// Variables
	const pageStart = window.pageYOffset || document.documentElement.scrollTop;
	const shrinkOn = 0;
	const header = document.getElementById('header');
	// Change header style
	if(pageStart > shrinkOn) {
		// shrink the header
		header.classList.add('shrinkHeader');
		// remove shrinking
	} else {
		if(header.classList.contains('shrinkHeader')) {
			header.classList.remove('shrinkHeader');
		}
	}
});