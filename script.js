const buttons=document.querySelectorAll('[data-lang]');
const items=document.querySelectorAll('[data-ru][data-en]');
function setLang(lang){
  items.forEach(el=>el.textContent=el.dataset[lang]);
  buttons.forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  document.documentElement.lang=lang;
  localStorage.setItem('asv-lang',lang);
}
buttons.forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
setLang(localStorage.getItem('asv-lang')||'ru');

const reveals=document.querySelectorAll('.scene-copy,.progress-head,.cards,.roadmap-copy,.final-copy');
reveals.forEach(el=>el.classList.add('reveal'));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(el=>obs.observe(el));