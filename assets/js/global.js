const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  if (!mobileMenu || !burger) return;
  const isOpen = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = isOpen ? 'none' : 'flex';
  burger.setAttribute('aria-expanded', String(!isOpen));
}

if (burger) {
  burger.addEventListener('click', toggleMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      if (burger) burger.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('[data-reveal]');

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.01,
    }
  );

  revealElements.forEach(element => {
    const delay = element.getAttribute('data-reveal-delay');
    if (delay) {
      element.style.setProperty('--reveal-delay', delay);
    }
    observer.observe(element);
  });
}

document.querySelectorAll('[data-path-picker]').forEach(picker => {
  const tabs = picker.querySelectorAll('[data-path-target]');
  const panels = picker.querySelectorAll('[data-path-panel]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-path-target');

      tabs.forEach(item => {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-path-panel') === target);
      });
    });
  });
});

document.querySelectorAll('[data-home-checklist]').forEach(checklist => {
  const boxes = checklist.querySelectorAll('input[type="checkbox"]');
  const count = checklist.querySelector('[data-check-count]');

  function updateCount() {
    if (!count) return;
    count.textContent = String([...boxes].filter(box => box.checked).length);
  }

  boxes.forEach(box => box.addEventListener('change', updateCount));
  updateCount();
});
