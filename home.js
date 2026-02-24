function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  const newTheme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
}

function applyTheme(theme) {
  const body = document.body;
  const icon = document.getElementById('theme-icon');

  // Begin icon transition
  icon.style.opacity = 0;
  icon.style.transform = 'rotate(180deg)';

  setTimeout(() => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      body.classList.remove('dark-mode');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }

    // Restore icon appearance after swap
    icon.style.opacity = 1;
    icon.style.transform = 'rotate(0deg)';
  }, 200);
}

function typeWriter(elementId, phrases, speed = 80, pause = 2000) {
  const el = document.getElementById(elementId);
  let phraseIndex = 0, charIndex = 0, isDeleting = false;
  function tick() {
    const current = phrases[phraseIndex];
    el.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    let delay = isDeleting ? speed / 2 : speed;
    if (!isDeleting && charIndex === current.length) { delay = pause; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    setTimeout(tick, delay);
  }
  tick();
}

// function for handling clicks to collapse content sections
document.querySelectorAll('.collapsible').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    button.classList.toggle('active');
    content.classList.toggle('collapsed');
    if (!content.classList.contains('collapsed')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Initialize collapsed state
document.querySelectorAll('.collapsible').forEach(button => {
  const content = button.nextElementSibling;
  button.classList.add('active');
  content.classList.remove('collapsed');
  content.style.maxHeight = content.scrollHeight + 'px';
});

function initStarField() {
  const canvas = document.getElementById('hero-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const header = canvas.parentElement;

  function resize() {
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(header);

  const NUM_STARS = 90;
  const stars = Array.from({ length: NUM_STARS }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.4 + 0.4,
    baseOpacity: Math.random() * 0.5 + 0.25,
    twinkleSpeed: Math.random() * 0.8 + 0.3,
    twinklePhase: Math.random() * Math.PI * 2,
    driftX: (Math.random() - 0.5) * 0.00012,
    driftY: (Math.random() - 0.5) * 0.00006,
  }));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Static render only
    const w = canvas.width, h = canvas.height;
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.baseOpacity})`;
      ctx.fill();
    }
    return;
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    const t = Date.now() * 0.001;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.x = (s.x + s.driftX + 1) % 1;
      s.y = (s.y + s.driftY + 1) % 1;
      const alpha = s.baseOpacity * (0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.addEventListener('DOMContentLoaded', () => {
  // Click-to-copy email
  const emailCard = document.getElementById('email-contact-card');
  if (emailCard) {
    emailCard.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'cbejar93@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard');
        }).catch(() => {
          window.location.href = 'mailto:' + email;
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // Star-field hero canvas
  initStarField();

  // Dynamic copyright year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Theme initialization
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // Typing animation for tagline
  typeWriter('tagline-text', ['Software Engineer', 'Full-Stack Developer', 'Node.js Enthusiast', 'API Architect']);

  // Scroll-reveal for sections
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-on-scroll');
    revealObserver.observe(section);
  });

  // Footer animation
  const footer = document.querySelector('footer');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('reveal');
      }
    });
  }, {
    threshold: 0.1
  });
  observer.observe(footer);
});
