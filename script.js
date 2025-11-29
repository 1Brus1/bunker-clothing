// Bunker Clothing — Cinematic JS

// Helper: is touch device
const isTouch = matchMedia('(hover:none), (pointer:coarse)').matches;

// A12.1: Sticky shrink on scroll + progress bar (A17.2)
const header = document.querySelector('.site-header');
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) header.classList.add('scrolled'); else header.classList.remove('scrolled');

  const doc = document.documentElement;
  const scrolled = (doc.scrollTop) / (doc.scrollHeight - doc.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// A17.1: White preloader → reveal header + hero
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    // Header reveal
    document.querySelector('.site-header').classList.add('revealed');
    // Hero stagger reveals
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero-btn');
    requestAnimationFrame(()=>{
      title.style.opacity = 1; title.style.transform = 'translateY(0)';
      setTimeout(()=>{ subtitle.style.opacity = 1; subtitle.style.transform = 'translateY(0)'; }, 150);
      setTimeout(()=>{ cta.style.opacity = 1; cta.style.transform = 'translateY(0)'; }, 300);
    });
  }, 1200);
});

// A13.1: Reveal sections on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); }});
},{threshold:0.15});
document.querySelectorAll('.section-animate').forEach(sec=>observer.observe(sec));

// A17.3: Back-to-top
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if (window.scrollY > 400) backBtn.classList.add('show'); else backBtn.classList.remove('show');
});
backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// A17.4: Cursor glow FX (desktop only)
const cursor = document.getElementById('cursor');
if (!isTouch) {
  document.body.classList.remove('no-cursorfx');
  let x=0,y=0, tx=0, ty=0;
  const speed = 0.18;
  function animate(){
    tx += (x - tx) * speed;
    ty += (y - ty) * speed;
    cursor.style.transform = `translate(${tx}px, ${ty}px)`;
    requestAnimationFrame(animate);
  }
  window.addEventListener('mousemove', e=>{ x=e.clientX; y=e.clientY; });
  animate();
} else {
  document.body.classList.add('no-cursorfx');
}

// A17.5: Animation toggle switch
const animSwitch = document.getElementById('animSwitch');
const animStateText = document.getElementById('animState');

// Load saved pref
const saved = localStorage.getItem('bunker_anim_enabled');
const enabled = saved === null ? true : saved === 'true';
animSwitch.checked = enabled;
setAnim(enabled);

animSwitch.addEventListener('change', ()=>{
  const on = animSwitch.checked;
  setAnim(on);
  localStorage.setItem('bunker_anim_enabled', String(on));
  // small pulse handled by CSS active state
});

function setAnim(on){
  if (on){
    document.body.classList.remove('anim-off');
    animStateText.textContent = 'ON';
  } else {
    document.body.classList.add('anim-off');
    animStateText.textContent = 'OFF';
  }
}
