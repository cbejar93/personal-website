function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  const toggleText = document.querySelector('.toggle-btn');
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    toggleText.innerHTML = '<i id="theme-icon" class="fas fa-sun"></i> Toggle Light Mode';
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    toggleText.innerHTML = '<i id="theme-icon" class="fas fa-moon"></i> Toggle Dark Mode';
  }
}

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
