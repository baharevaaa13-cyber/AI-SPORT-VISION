
const langButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-ru][data-en]');
const menu = document.querySelector('.menu');

function setLang(lang){
  translatable.forEach(el => el.textContent = el.dataset[lang]);
  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  document.documentElement.lang = lang;
  localStorage.setItem('asv-language', lang);
}

langButtons.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
setLang(localStorage.getItem('asv-language') || 'ru');

document.querySelector('.menu-button').addEventListener('click', () => menu.classList.add('open'));
document.querySelector('.menu-close').addEventListener('click', () => menu.classList.remove('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

const slides = [...document.querySelectorAll('.slide')];
const current = document.querySelector('.slide-counter .current');

const slideObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const index = slides.indexOf(entry.target) + 1;
      current.textContent = String(index).padStart(2,'0');
    }
  });
}, {threshold:.55});
slides.forEach(slide => slideObserver.observe(slide));

const revealTargets = document.querySelectorAll('.content');
revealTargets.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.15});
revealTargets.forEach(el => revealObserver.observe(el));
