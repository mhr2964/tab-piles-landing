// Tab Piles landing — minimal JS. Wires CWS link + LemonSqueezy overlay.
//
// Two user-block placeholders below (CWS_URL, LS_OVERLAY_URLS) — fill in after
// CWS submission goes live and LemonSqueezy products are created.

const CWS_URL = 'https://chrome.google.com/webstore/detail/__CWS_EXTENSION_ID__'

const LS_OVERLAY_URLS = {
  monthly: 'https://tabpiles.lemonsqueezy.com/checkout/buy/__MONTHLY_VARIANT_ID__',
  yearly: 'https://tabpiles.lemonsqueezy.com/checkout/buy/__YEARLY_VARIANT_ID__',
  lifetime: 'https://tabpiles.lemonsqueezy.com/checkout/buy/__LIFETIME_VARIANT_ID__',
}

document.querySelectorAll('[data-cws-url]').forEach((a) => {
  a.setAttribute('href', CWS_URL)
  a.setAttribute('target', '_blank')
  a.setAttribute('rel', 'noopener')
})

document.querySelectorAll('[data-ls-product]').forEach((a) => {
  const product = a.getAttribute('data-ls-product')
  const url = LS_OVERLAY_URLS[product]
  if (!url) return
  a.setAttribute('href', `${url}?embed=1`)
  a.classList.add('lemonsqueezy-button')
})

const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()

const lsScript = document.createElement('script')
lsScript.src = 'https://app.lemonsqueezy.com/js/lemon.js'
lsScript.defer = true
document.head.appendChild(lsScript)
