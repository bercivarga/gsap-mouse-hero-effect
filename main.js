import './style.css'

import gsap from 'gsap'

const images = [
  "/images/flowers.jpg",
  "/images/person-in-flowers.jpg",
  "/images/winter.jpg"
]

// preload images
images.forEach(image => {
  const img = document.createElement("img")
  img.src = image
});


// cursor following effect

const mouse = {x: 0, y: 0};

document.addEventListener('mousemove', (e) => {
    mouse.x = e.pageX
    mouse.y = e.pageY
});

const cursor = document.getElementById('cursor');

function moveCursor() {
  gsap.to(cursor, {
    duration: 0.3,
    left: mouse.x,
    top: mouse.y,
    ease: 'power1.out',
  });
}

function showCursor() {
  gsap.to(cursor, {
    duration: 0.3,
    opacity: 1,
    ease: 'power1.out',
  });
}

function hideCursor() {
  gsap.to(cursor, {
    duration: 0.3,
    opacity: 0,
    ease: 'power1.out',
  });
}

document.addEventListener('mouseenter', showCursor);
document.addEventListener('mouseleave', hideCursor);
document.addEventListener('mousemove', moveCursor);

const cursorIcon = document.getElementById('cursor-icon');

function onHoveringOnHeroItems(event) {
  const target = event.target;

  // get target's data-cursor-icon attribute
  const cursorImage = target.getAttribute('data-cursor-image');
  
  // get the element within the cursor's element that has the same attribute
  const cursorDisplayedElement = cursor.querySelector(`[data-cursor-image="${cursorImage}"]`);
  const allElementsWithinCursor = cursor.querySelectorAll(`[data-cursor-image]`);
  const allOtherCursorDisplayedElements = cursor.querySelectorAll(`[data-cursor-image]:not([data-cursor-image="${cursorImage}"])`);

  if (!cursorImage || !cursorDisplayedElement) {
    gsap.to(cursorIcon, {
      autoAlpha: 1,
      ease: 'power1.out',
    });

    gsap.to(cursorIcon, {
      display: 'block',
      ease: 'power1.out',
      delay: 0.3,
    });

    gsap.to(cursor, {
      scale: 1,
      ease: 'power1.out',
    });

    allElementsWithinCursor.forEach((element) => {
      gsap.to(element, {
        autoAlpha: 0.001,
        ease: 'power1.out',
        duration: 0.3,
      });
    });

    return;
  };

  gsap.to(cursorIcon, {
    opacity: 0.001,
    ease: 'power1.out',
  });

  gsap.to(cursorIcon, {
    display: 'none',
    ease: 'power1.out',
  });

  gsap.to(cursorDisplayedElement, {
    autoAlpha: 1,
    ease: 'power1.out',
    duration: 0.3,
  });

  allOtherCursorDisplayedElements.forEach((element) => {
    gsap.to(element, {
      autoAlpha: 0.001,
      ease: 'power1.out',
      duration: 0.3,
    });
  });

  gsap.to(cursor, {
    scale: 2.5,
    ease: 'power1.out',
  });
}

document.addEventListener('mousemove', onHoveringOnHeroItems);