
// Simple SPA navigation + animated reveals
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.menu a');
const revealables = () => document.querySelectorAll('.reveal');

function setActive(pageId){
  pages.forEach(p => {
    if(p.id === pageId){ p.classList.add('active'); p.style.display='block' }
    else { p.classList.remove('active') }
  });
  links.forEach(l => l.classList.toggle('active', l.dataset.page===pageId));
  runReveal();
}

links.forEach(a => {
  a.addEventListener('click', (e) => {
    const p = a.dataset.page;
    setActive(p);
    history.pushState({page:p}, '', '#'+p);
  });
});

// handle hash on load
window.addEventListener('load', () => {
  const target = location.hash.replace('#','') || 'home';
  setActive(target);
  populateProjects();
});

// handle popstate
window.addEventListener('popstate', (e) => {
  const p = (e.state && e.state.page) || location.hash.replace('#','') || 'home';
  setActive(p);
});

// reveal on scroll using IntersectionObserver
function runReveal(){
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        o.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  items.forEach(i => obs.observe(i));
}

// example projects (you should replace these with real projects)
const PROJECTS = [
  {
    "title":"Animated Portfolio",
    "desc":"A polished SPA portfolio with smooth transitions and accessibility in mind.",
    "tech":["HTML","CSS","JS"],
    "link":"#"
  },
  {
    "title":"Secure Notes (Demo)",
    "desc":"A small demo exploring secure storage patterns for local notes (concept).",
    "tech":["JS","LocalStorage"],
    "link":"#"
  },
  {
    "title":"Mini CTF Challenges",
    "desc":"Problem set and writeups focused on beginner-friendly cybersecurity problems.",
    "tech":["Python","Web"],
    "link":"#"
  }
];

function populateProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  PROJECTS.forEach((p, idx) => {
    const node = document.createElement('div');
    node.className = 'project reveal';
    node.innerHTML = `<h4>${p.title}</h4><p>${p.desc}</p><p class="muted">${p.tech.join(' • ')}</p><p><a class="readmore" href="${p.link}" onclick="return false;">Explore</a></p>`;
    grid.appendChild(node);
  });
  runReveal();
}

// simple contact form demo
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const name = form.name.value || 'Friend';
  alert('Thanks '+name+' — this is a demo contact form. Email: manish.kadam18440@sakec.ac.in');
}

// theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  // brief visual feedback
  themeToggle.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:500});
});
