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
  const mobileNav = window.matchMedia('(max-width: 980px)');
  const setNavigation = (open, restoreFocus = false) => {
    nav.classList.toggle('open', open);
    nav.inert = mobileNav.matches && !open;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) navToggle.focus();
  };
  navToggle.addEventListener('click', () => setNavigation(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavigation(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) setNavigation(false, true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) setNavigation(false);
  });
  mobileNav.addEventListener('change', () => setNavigation(false));
  setNavigation(false);
}

if (quoteForm) {
  quoteForm.querySelector('[data-quote-fields]').disabled = false;
  const result = quoteForm.querySelector('[data-quote-result]');
  const summary = quoteForm.querySelector('[data-quote-summary]');
  const status = quoteForm.querySelector('[data-quote-status]');
  const tripType = quoteForm.elements.tripType;
  const returnFields = quoteForm.querySelector('[data-return-fields]');
  const updateReturn = () => {
    const roundTrip = tripType.value === 'Round trip';
    returnFields.hidden = !roundTrip;
    returnFields.querySelectorAll('input').forEach(input => {
      input.disabled = !roundTrip;
      input.required = roundTrip;
    });
    quoteForm.elements.returnDate.min = quoteForm.elements.date.value;
  };
  tripType.addEventListener('change', updateReturn);
  quoteForm.elements.date.addEventListener('change', updateReturn);
  updateReturn();
  quoteForm.addEventListener('input', () => { result.hidden = true; });
  quoteForm.addEventListener('change', () => { result.hidden = true; });
  quoteForm.querySelector('[data-copy-quote]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.value);
      status.textContent = 'Copied. Paste the request into your email and send it to marketing@strut2.com.';
    } catch (_) {
      summary.focus();
      summary.select();
      status.textContent = 'Select and copy the prepared text below, then paste it into your email.';
    }
  });
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const subject = `STRUT2 quote request — ${data.get('service')}`;
    const body = [
      'Hello STRUT2,', '', 'I would like a transportation quote.', '',
      `Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Phone: ${data.get('phone')}`,
      `Travel date: ${data.get('date')}`, `Pickup time (local): ${data.get('time')}`, `Service: ${data.get('service')}`,
      `Pickup: ${data.get('pickup')}`, `Destination: ${data.get('destination')}`,
      `Passengers: ${data.get('passengers')}`, `Trip type: ${data.get('tripType')}`,
      ...(data.get('tripType') === 'Round trip' ? [`Return date: ${data.get('returnDate')}`, `Return pickup time (local): ${data.get('returnTime')}`] : []),
      `Additional details: ${data.get('details') || 'None provided'}`,
      ...Array.from(quoteForm.querySelectorAll('[data-quote-label]')).map(field => `${field.dataset.quoteLabel}: ${field.value || 'Not provided'}`),
      ...(!quoteForm.hasAttribute('data-service-specific') && data.get('service') === 'Corporate travel' ? [`Company / coordinator: ${data.get('coordinator') || 'Not provided'}`, `Preferred follow-up: ${data.get('followup')}`] : []), '',
      'Please contact me with availability and pricing.'
    ].join('\n');
    summary.value = `${subject}\n\n${body}`;
    result.hidden = false;
    status.textContent = 'Your request is ready. It has not been sent. Choose Email my request or copy the details below.';
    const emailLink = quoteForm.querySelector('[data-email-quote]');
    emailLink.href = `mailto:marketing@strut2.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailLink.focus();
  });
}

 
// Carry the service-card choice into the quote request.
if (quoteForm && !quoteForm.hasAttribute('data-service-specific')) {
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

if (quoteForm && !quoteForm.hasAttribute('data-service-specific')) {
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
      service.dispatchEvent(new Event('change', { bubbles: true }));
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
    firstVisit = false; // Keep it hidden when visit history cannot be saved.
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
    quoteForm.querySelector('[name="tripType"]').dispatchEvent(new Event('change', { bubbles: true }));
    const details = quoteForm.querySelector('[name="details"]');
    const offerText = 'Please include the first-time rider offer: 20% off the return airport transfer with a round-trip booking.';
    if (!details.value.includes(offerText)) details.value = [details.value, offerText].filter(Boolean).join('\n');
    quoteForm.querySelector('[name="name"]').focus({ preventScroll: true });
  });
}

// Service pages can preselect a known service without accepting arbitrary text.
if (quoteForm) {
  const requestedService = new URLSearchParams(window.location.search).get('service');
  const select = quoteForm.elements.service;
  if (requestedService && select.options && Array.from(select.options).some(option => option.value === requestedService)) {
    select.value = requestedService;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

