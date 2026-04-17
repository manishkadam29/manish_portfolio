// DOM Elements
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.menu a');
const menu = document.getElementById('mainMenu');
const hamburger = document.getElementById('hamburger');

// Navigation function
function setActive(pageId) {
  pages.forEach(p => {
    if (p.id === pageId) {
      p.classList.add('active');
      p.style.display = 'block';
      // Trigger animation
      setTimeout(() => runReveal(), 10);
    } else {
      p.classList.remove('active');
      p.style.display = 'none';
    }
  });
  
  links.forEach(l => l.classList.toggle('active', l.dataset.page === pageId));
  
  // Close mobile menu
  if (menu.classList.contains('active')) {
    toggleMenu();
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu links event listeners
links.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const p = a.dataset.page;
    setActive(p);
    history.pushState({ page: p }, '', '#' + p);
  });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  toggleMenu();
});

function toggleMenu() {
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
  const isExpanded = menu.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (menu.classList.contains('active') && 
      !menu.contains(e.target) && 
      !hamburger.contains(e.target)) {
    toggleMenu();
  }
});

// Handle hash on load
window.addEventListener('load', () => {
  const target = location.hash.replace('#', '') || 'home';
  setActive(target);
  populateProjects();
});

// Handle popstate (browser back/forward)
window.addEventListener('popstate', (e) => {
  const p = (e.state && e.state.page) || location.hash.replace('#', '') || 'home';
  setActive(p);
});

// Reveal on scroll using IntersectionObserver
function runReveal() {
  const items = document.querySelectorAll('.reveal:not(.show)');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  items.forEach(item => observer.observe(item));
}

// Projects data
const PROJECTS = [
  {
    "title": "Secure Data Wiper",
    "desc": "Cross-platform application for secure data deletion with tamper-proof certificates. Built for privacy-focused users.",
    "tech": ["Python", "Cryptography", "Cross-Platform"],
    "link": "#"
  },
  {
    "title": "Animated Portfolio",
    "desc": "A polished SPA portfolio with smooth transitions, accessibility features, and modern design principles.",
    "tech": ["HTML", "CSS", "JavaScript"],
    "link": "#"
  },
  {
    "title": "Mini CTF Platform",
    "desc": "Beginner-friendly cybersecurity challenges and writeups focused on common web vulnerabilities.",
    "tech": ["Python", "Web Security", "Flask"],
    "link": "#"
  }
];

function populateProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  
  PROJECTS.forEach((p, idx) => {
    const node = document.createElement('div');
    node.className = 'project reveal';
    if (idx > 0) node.classList.add(idx === 1 ? 'delay' : 'delay-2');
    
    node.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <p class="muted">${p.tech.join(' • ')}</p>
      <a class="readmore" href="${p.link}" onclick="return false;">Explore →</a>
    `;
    
    grid.appendChild(node);
  });
  
  runReveal();
}

// Contact form handler
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value || 'Friend';
  const email = form.email.value;
  
  // Demo alert - replace with actual form submission
  alert(`Thanks ${name}! This is a demo contact form.\n\nYour message would be sent from: ${email}\n\nFor now, please email me directly at:\nmanish.kadam18440@sakec.ac.in`);
  
  form.reset();
}

// Helper function for navigation from buttons
function navigateTo(page) {
  setActive(page);
  history.pushState({ page: page }, '', '#' + page);
  return false;
}

// Initialize reveals on page load
document.addEventListener('DOMContentLoaded', () => {
  runReveal();
});
