'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///Scroll btn

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////
//PAGE NAVIGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Menu fade animation

const nav = document.querySelector('.nav');

const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(x => {
      if (link !== x) {
        x.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};

nav.addEventListener('mouseover', handleOver.bind(0.5));

nav.addEventListener('mouseout', handleOver.bind(1));

//Sticky navigation

const header = document.querySelector('.header');
const navHeight = Number.parseInt(nav.getBoundingClientRect().height);

const obsFunc = function (entries) {
  //Destructuring entries array
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const obsOpt = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsFunc, obsOpt);
observer.observe(header);

//Animation effect

const sectionsArr = document.querySelectorAll('.section');
sectionsArr.forEach(x => x.classList.add('section--hidden'));

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

sectionsArr.forEach(x => sectionObserver.observe(x));

//Lazy loading images

const lazyImg = document.querySelectorAll('img[data-src]');

const lazyFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replacing img
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  //Stop observing
  observer.unobserve(entry.target);
};

const lazyOpt = {
  root: null,
  threshold: 0.05,
};

const lazyObserver = new IntersectionObserver(lazyFunc, lazyOpt);

lazyImg.forEach(x => lazyObserver.observe(x));

//SLIDER

const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const dotContainer = document.querySelector('.dots');

  const init = function (x, y) {
    translateX(x);
    activateDot(y);
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class = "dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(x => x.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const translateX = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  init(0, 0);

  //0%, 100%, 200%, 300%

  //Changing slides
  const nextSlide = function () {
    curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;

    init(curSlide, curSlide);
  };

  const previousSlide = function () {
    if (curSlide === 0) curSlide = slides.length;
    curSlide--;

    init(curSlide, curSlide);
  };

  //Event handlers

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === `ArrowRight`) nextSlide();
    else if (e.key === `ArrowLeft`) previousSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const dotId = e.target.dataset.slide;
      init(dotId, dotId);
    }
  });
};

sliders();

//-100%, 0%, -100%, -200%

const NewElement = function () {
  console.log('Hey');
};
