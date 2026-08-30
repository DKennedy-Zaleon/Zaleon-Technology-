
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || 'Website inquiry');
      const body = encodeURIComponent(
        `Name: ${data.get('name') || ''}\n` +
        `Email: ${data.get('email') || ''}\n` +
        `Company: ${data.get('company') || ''}\n\n` +
        `${data.get('message') || ''}`
      );
      window.location.href = `mailto:support@zaleon.tech?subject=${subject}&body=${body}`;
    });
  }
});
