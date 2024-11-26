
Web Animations for WordPress Theme
===

This a thoroughly hacky WordPress theme thrown together for my presentation at the Vancouve WordPress Developer meetup. 

you can find the presentation itself here: https://lukerushton.com/animations-for-wordpress/.

This theme strips out nearly all content from page.php, other than what comes from the block editor.

It then uses GSAP to turn the home page into a fullscreen powerpoint-esq slideshow presentation.

To use the theme yourself, simply add content in the WordPress block editor. Then, encapsulate the all the content you want on each slide in a group with the CSS class "slide"

You can use the variant slides by also applying the classes "two-column" or "three-column"

"two-column" must have two sub groups, one with the class "two-column-right"

"three-column" must have three sub groups.


**WARNING**: As this was built to give a presentation, it lacks rigorous testing (or any for that matter!). Many things can go wrong

It's also **completely** broken on mobile devices. Maybe i'll fix that. or maybe not...