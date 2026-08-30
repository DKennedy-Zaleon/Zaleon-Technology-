const menuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('header nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    if (!open) {
      nav.style.position = 'absolute';
      nav.style.top = '68px';
      nav.style.left = '13px';
      nav.style.right = '13px';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'stretch';
      nav.style.gap = '0';
      nav.style.padding = '12px';
      nav.style.background = '#0b0e13';
      nav.style.border = '1px solid #1c2430';
      nav.style.borderRadius = '10px';
    }
  });
}
