const languageButtons = document.querySelectorAll('[data-lang]');
const translatedElements = document.querySelectorAll('[data-ru][data-en]');

function setLanguage(lang) {
  translatedElements.forEach(el => {
    el.textContent = el.dataset[lang];
  });

  languageButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('asv-language', lang);
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem('asv-language') || 'ru');

const revealElements = document.querySelectorAll(
  '.manifesto, .split-section, .solution, .status-section, .scale, .partnership, .founder'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));
