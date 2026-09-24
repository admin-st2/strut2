# STRUT2 review draft

This branch is for review. Do not merge or deploy until the owner approves the finished website. GoDaddy/DNS changes remain deferred.

## Prepared
- Massachusetts chauffeur and airport-transfer title and description.
- Canonical URL, sitemap and robots file targeting the intended production domain https://strut2.com/.
- Organization, WebSite and Service structured data; no invented address, reviews, prices or ratings.
- Social-sharing metadata using the approved chauffeur photograph.
- Approved chauffeur photograph replaces only the lower wide photograph.
- Fleet photograph with environmental lettering removed replaces the original in the same fleet card.
- Main hero, layout and navigation unchanged.
- Confirmed promotion: 20% off the return airport transfer with a round-trip booking.

## Analytics and alerts: NOT active
- Owner will check the existing Google Analytics property and supply its G- measurement ID.
- Alert recipient: reservations@strut2.com. This is only the confirmed alert destination, not approval to replace the site's customer contact address.
- Per-session email alerts require a separate backend/service; GA4 alone is not a per-visit email notifier. Provider and cost remain to be decided.
- Planned events: reservation_link_click, telephone_link_click, quote_prepared, quote_email_click, quote_copied, offer_claimed. No names, emails, telephone numbers, locations, itineraries or free-text form contents should enter analytics.
- quote_prepared and quote_email_click do not mean an email was sent. reservation_link_click does not mean a booking was completed.
- Keep provider secrets off the public site. No tracking scripts or notification calls have been added.

## Before release
- Review desktop and phone rendering, navigation, all photo crops and readable background signage.
- Check both quote paths, return trip validation and corporate preselection without sending test messages.
- Confirm customer phone and marketing@strut2.com; existing values have not been changed.
- Confirm use permission for approved supplied photography.
- Verify domain in GitHub; configure Pages custom domain before GoDaddy DNS changes.
- Check root and www routing and HTTPS.
- Canonical, Open Graph and sitemap URLs become valid when this draft is released at strut2.com.
- Confirm old URLs and redirects before switching hosting.
- Connect Search Console and submit sitemap after launch; SEO changes do not guarantee ranking.
- Choose analytics privacy/consent setup before activating tracking.

## Airport service and flight-status draft
- Airport card now opens airport-transfers.html with service details, FAQs and an external FlightAware button. This is a status lookup link, not embedded live flight tracking or an automatic pickup-time update.
- Quote links preselect Airport transfer using a validated service parameter.
- Limo Anywhere documentation describes automatic flight tracking and optional ETA-based pickup updates. Account configuration has not been checked or changed.
- Confirmed: cancellation of outbound trip removes the return-trip promotion.
- Confirmed: free cancellation at least two hours ahead applies ONLY to hourly service. It does not apply to chartered weddings/proms. Airport and charter cancellation terms remain undecided and are not invented on the page.
- Still required: last-minute fee amount and threshold, late/no-show charge, charter/airport cancellation terms, waiting allowances, promotion base fare vs full total.
- Image rotation is proposed, not enabled. Recommend approved hero images changing between visits or on a schedule; retain fixed fleet photos. A timed slideshow would need pause controls and reduced-motion support.


## September 24 review draft
- Added five service detail pages, booking guidelines, and a factual website privacy draft.
- All six service cards open detail pages; service quotes carry a validated service selection.
- Welcome offer heading uses Times New Roman.
- No paid tracking, automatic estimates, analytics, or visitor emails have been enabled.
- Privacy copy and service-specific terms require owner review. Confirm business contact details before launch.
- Image rotation remains off pending an approved image set and rotation preference.

- Each service page now includes a dedicated quote form with a fixed service and tailored fields. All quote buttons on those pages stay on the same page. Requests are prepared for email, not automatically submitted or priced.

## Contact page draft
- contact.php could not be retrieved (502 / certificate verification error); exact contents remain unverified.
- Used indexed official About page for bookings@strut2.com and (212) 961-7894; official homepage for marketing@strut2.com. No template placeholder email copied.
- Added contact.html, direct contact actions, six service-specific quote links, navigation/footer links and sitemap entry.
- Confirm contact.php details from a screenshot or pasted text before treating this as a complete migration. No address or hours invented.

## Contact screenshot verified
- User supplied the old contact page screenshot. It supersedes provisional contact-page addresses: customer service info@strut2.com; business development partner@strut2.com; reservations reservations@strut2.com; safety/compliance compliance@strut2.com. All show 212-961-7894.
- Updated four contact cards, click-to-call/email actions, and all homepage/service quote recipients to reservations@strut2.com. Marketing remains in the footer as shown in the screenshot.
- Added FAQ topics with draft answers based on confirmed site/service information; the screenshot does not show original FAQ answers. No unverified safety claims or social/profile links copied.

## About page from supplied screenshot
- Added about.html with edited company story, mission, three values, fleet link, payment information, contact actions, and the three fully readable testimonials supplied by the user. The partially clipped fourth testimonial was not reconstructed.
- Used the approved chauffeur image; no new fleet images or social links introduced. No review ratings or review structured data added.
- Preserved screenshot payment methods and contracted corporate account terms. Reservations use the more recently confirmed reservations@strut2.com.
- Header company links and footer navigation now include About STRUT2; homepage Why STRUT2 section remains available. Updated sitemap and CSS version.
