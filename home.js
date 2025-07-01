function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
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
  document.querySelectorAll('.collapsible-content').forEach(content => {
    content.classList.add('collapsed');
    content.style.maxHeight = 0;
  });