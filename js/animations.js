//vanilla JS animations
let boxActive = document.querySelector(".box-active");

boxActive.addEventListener("click", () => {
    boxActive.classList.add("box-active-effect");
    setTimeout(function () {
        boxActive.classList.remove("box-active-effect");
    }, 2000);
});

//GSAP demo animation
const timeline = gsap.timeline({ repeat: -1, yoyo: true });
timeline
    .to(".square:nth-child(1)", { x: 100, duration: 1, ease: "power1.out" }) // Move first square
    .to(
        ".square:nth-child(2)",
        { y: -50, duration: 2, ease: "power1.out" },
        "<"
    ) // Move second square
    .to(".square:nth-child(3)", {
        rotate: 360,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
    }); // Rotate third square

//animations for the slideshow------------------------------------------------
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let panels = gsap.utils.toArray(".slide"),
    observer,
    scrollTween;

if (ScrollTrigger.isTouch === 1) {
    observer = ScrollTrigger.normalizeScroll(true);
}

// on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
document.addEventListener(
    "touchstart",
    (e) => {
        if (scrollTween) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    },
    { capture: true, passive: false }
);

function goToSection(i) {
    scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        onStart: () => {
            if (!observer) return;
            observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
            observer.enable();
        },
        duration: 0.5,
        onComplete: () => (scrollTween = null),
        overwrite: true,
    });
}

panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
    });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: 1 / (panels.length - 1),
});
