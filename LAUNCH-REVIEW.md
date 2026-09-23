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
