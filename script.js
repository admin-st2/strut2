const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const quoteForm = document.querySelector('[data-quote-form]');

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const subject = `STRUT2 quote request — ${data.get('service')}`;
    const body = [
      'Hello STRUT2,', '', 'I would like a transportation quote.', '',
      `Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Phone: ${data.get('phone')}`,
      `Travel date: ${data.get('date')}`, `Service: ${data.get('service')}`,
      `Pickup: ${data.get('pickup')}`, `Destination: ${data.get('destination')}`,
      `Passengers: ${data.get('passengers')}`, `Trip type: ${data.get('tripType')}`,
      `Additional details: ${data.get('details') || 'None provided'}`, '',
      'Please contact me with availability and pricing.'
    ].join('\n');
    window.location.href = `mailto:marketing@strut2.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
