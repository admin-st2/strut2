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
      `Additional details: ${data.get('details') || 'None provided'}`,
      ...(data.get('service') === 'Corporate travel' ? [`Company / coordinator: ${data.get('coordinator') || 'Not provided'}`, `Preferred follow-up: ${data.get('followup')}`] : []), '',
      'Please contact me with availability and pricing.'
    ].join('\n');
    window.location.href = `mailto:marketing@strut2.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

 
// Carry the service-card choice into the quote request.
if (quoteForm) {
  const serviceSelect = quoteForm.querySelector('[name="service"]');
  const serviceNames = {
    'Airport Transfers': 'Airport transfer',
    'Corporate Travel': 'Corporate travel',
    'Weddings & Anniversaries': 'Wedding or anniversary',
    'Proms & Graduations': 'Prom or graduation',
    'Night on the Town': 'Night on the town',
    'Private Events': 'Private event'
  };
  document.querySelectorAll('.service-card').forEach((card) => {
    const link = card.querySelector('a[href="#quote"]');
    const service = serviceNames[card.querySelector('h3')?.textContent.trim()];
    if (!link || !serviceSelect || !service) return;
    link.addEventListener('click', () => {
      serviceSelect.value = service;
      serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}

if (quoteForm) {
  const service = quoteForm.querySelector('[name="service"]');
  const updateInquiry = () => {
    const corporate = service.value === 'Corporate travel';
    quoteForm.querySelector('[data-executive-fields]').hidden = !corporate;
    quoteForm.querySelector('[data-inquiry-title]').textContent = corporate ? 'Your executive travel request' : 'Plan your journey';
    quoteForm.querySelector('[data-inquiry-context]').textContent = corporate
      ? 'Share your schedule, stops, and preferences. Please leave confidential meeting details out of this request.'
      : 'Share your travel details for a personal quote.';
  };
  service.addEventListener('change', updateInquiry);
  document.querySelectorAll('[data-executive-inquiry]').forEach(link => {
    link.addEventListener('click', () => {
      service.value = 'Corporate travel';
      updateInquiry();
    });
  });
  updateInquiry();
}

 
// Show the welcome offer only on the first visit in this browser.
const welcomeOffer = document.querySelector('[data-welcome-offer]');
if (welcomeOffer) {
  const visitKey = 'strut2:visited';
  let firstVisit = false;
  try {
    firstVisit = localStorage.getItem(visitKey) === null;
    localStorage.setItem(visitKey, '1');
  } catch (_) {
    // Keep it hidden when visit history cannot be saved.
  }
  if (firstVisit) {
    window.setTimeout(() => { welcomeOffer.hidden = false; }, 4000);
  }
  const dismissOffer = () => {
    const heldFocus = welcomeOffer.contains(document.activeElement);
    welcomeOffer.hidden = true;
    if (heldFocus) document.querySelector('.brand')?.focus({ preventScroll: true });
  };
  welcomeOffer.querySelector('[data-offer-close]').addEventListener('click', dismissOffer);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !welcomeOffer.hidden) dismissOffer();
  });
  welcomeOffer.querySelector('[data-offer-claim]').addEventListener('click', () => {
    welcomeOffer.hidden = true;
    if (!quoteForm) return;
    const service = quoteForm.querySelector('[name="service"]');
    service.value = 'Airport transfer';
    service.dispatchEvent(new Event('change', { bubbles: true }));
    quoteForm.querySelector('[name="tripType"]').value = 'Round trip';
    const details = quoteForm.querySelector('[name="details"]');
    const offerText = 'Please include the first-time rider offer: 20% off the return airport transfer with a round-trip booking.';
    if (!details.value.includes(offerText)) details.value = [details.value, offerText].filter(Boolean).join('\n');
    quoteForm.querySelector('[name="name"]').focus({ preventScroll: true });
  });
}
