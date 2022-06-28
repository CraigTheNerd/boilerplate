const navSlide = () => {

	document.querySelector('.burger').addEventListener('click', function (event) {

		const dom = document.body;
		const burger = document.querySelector('.burger');
		const nav = document.getElementById('nav');
		const navFooter = document.getElementById('nav-footer');
		const navFooterText = document.getElementById('nav-footer-text');
		const menuLinks = document.querySelectorAll('.nav-items li.menuLink');
		const navLinks = document.querySelectorAll('.nav-items li.menuLink a.navLink');

		//	1.	Open and Close the menu
		nav.classList.toggle('open');
		navFooter.classList.toggle('open');
		document.documentElement.classList.toggle('page-overlay');

		//	1.1	Check if Menu is open
		//	navFooter opens with menu
		//	So if navFooter is open then menu is open
		//	Menu might be closed before the navFooter enters the viewport
		//	If Menu and then by extension, navFooter is closed before the 700ms
		//	Do not run the animation of navFooter social media and text
		setTimeout(() => {
			if(navFooter.classList.contains('open')) {
				navFooter.classList.add('slideInUp');
				setTimeout(() => { navFooterText.classList.add('slideInUp'); }, 200);
			}
		}, 700);

		//	1.2	If the Menu and navFooter have been open for long enough that the navFooter animation has played
		//	And then the Menu burger is clicked, remove the animation classes
		//	Otherwise, if the Menu is opened and closed before the animation has played
		//	The next time the menu is opened, the animation will not play
		if(navFooterText.classList.contains('slideInUp')) {
			navFooter.classList.remove('slideInUp');
			navFooterText.classList.remove('slideInUp');
		}


		//	2.	Animate Links - this should work
		menuLinks.forEach((link, index) => {
			//	If statement to repeat the animation
			//	Otherwise animation only works on first open
			if(link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `menuLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
			}

			//	2.1	When the dom is clicked
			//	The animation is removed so that the loop
			//	can add the animation on the next menu open
			//	Otherwise menu items do not show
			dom.addEventListener('click', function(styleRemoveEvent) {
				link.style.animation = '';
				navFooter.classList.remove('open');
				navFooter.classList.remove('slideInUp');
				navFooterText.classList.remove('slideInUp');
				styleRemoveEvent.stopPropagation();
			});

			//	2.2	Close the menu when a nav item is clicked
			for (let i = 0; i < navLinks.length; i++) {
				navLinks[i].addEventListener("click", function(navLinksEvent) {
					nav.classList.remove('open');
					burger.classList.remove('closeIcon');
					document.documentElement.classList.remove('page-overlay');
					link.style.animation = '';
					navFooter.classList.remove('open');
					navFooter.classList.remove('slideInUp');
					navFooterText.classList.remove('slideInUp');
					navLinksEvent.stopPropagation();
				});
			}
		});


		//	3.	Change the icon
		burger.classList.toggle('closeIcon');
		//	Pause Function here so that it waits until there are more clicks
		event.stopPropagation();


		//	4.	If Nav is clicked do not close menu
		nav.addEventListener('click', function(navEvent){
			navEvent.stopPropagation();
		});


		//	5.	If Dom is clicked
		dom.addEventListener('click', function(domEvent){
			nav.classList.remove('open');
			burger.classList.remove('closeIcon');
			document.documentElement.classList.remove('page-overlay');
			navFooter.classList.remove('open');
			navFooter.classList.remove('slideInUp');
			navFooterText.classList.remove('slideInUp');
			domEvent.stopPropagation();
		});

	});
}

navSlide();