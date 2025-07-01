function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  const newTheme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);


  // Update text label (optional if keeping fixed)
  const label = body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  icon.nextSibling.nodeValue = ` ${label}`;
}

function applyTheme(theme) {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  const toggleText = document.querySelector('.toggle-btn');

  // Begin icon transition
  icon.style.opacity = 0;
  icon.style.transform = 'rotate(180deg)';

  setTimeout(() => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      icon.nextSibling.nodeValue = ' Toggle Light Mode';
    } else {
      body.classList.remove('dark-mode');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      icon.nextSibling.nodeValue = ' Toggle Dark Mode';
    }

    // Restore icon appearance after swap
    icon.style.opacity = 1;
    icon.style.transform = 'rotate(0deg)';
  }, 200);
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

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  const toggleText = document.querySelector('.toggle-btn');
// text if generated fully for button here.
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    icon.nextSibling.nodeValue = ' Toggle Light Mode';
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    icon.nextSibling.nodeValue = ' Toggle Dark Mode';
  }
//  grabs theme from local storage or checks if user has a prefrence in the browser
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
});
