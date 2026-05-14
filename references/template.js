// Scroll-spy: highlight active nav section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('nav a').forEach((a) => a.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
