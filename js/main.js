// ============================
// Mobile Navigation
// ============================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================
// Header Scroll Effect
// ============================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================
// Active Nav Link on Scroll
// ============================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
        const link = document.querySelector('.nav__link[href="#' + s.id + '"]');
        if (link) {
            link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
        }
    });
});

// ============================
// Scroll Reveal (no library needed)
// ============================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once only
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================
// FAQ Accordion
// ============================
document.querySelectorAll('.faq__item').forEach(item => {
    item.querySelector('.faq__q').addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
    });
});

// ============================
// Counter Animation
// ============================
const statsSection = document.querySelector('.stats');
let counted = false;

if (statsSection) {
    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            document.querySelectorAll('.stats__num').forEach(el => {
                const target = +el.dataset.target;
                const step = target / 50;
                let current = 0;
                const tick = () => {
                    current += step;
                    if (current < target) {
                        el.textContent = Math.ceil(current);
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = target;
                    }
                };
                tick();
            });
        }
    }, { threshold: 0.4 }).observe(statsSection);
}

// ============================
// Contact Form → WhatsApp Redirect
// ============================
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const pincode = form.pincode.value;
    const bill = form.bill.value;
    const site = form.site ? form.site.value : '';

    const message = `Hi Ellipse Solar,\n\nI am interested in solar installation.\n\nName: ${name}\nWhatsApp: ${phone}\nPincode: ${pincode}\nSite: ${site}\nMonthly Bill: ${bill}\n\nPlease share details and a quote.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919216054155?text=${encoded}`, '_blank');
});

// ============================
// Popup Form → WhatsApp Redirect
// ============================
document.getElementById('popup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const pincode = form.pincode.value;
    const bill = form.bill.value;
    const site = form.site ? form.site.value : '';

    const message = `Hi Ellipse Solar,\n\nI am interested in solar installation.\n\nName: ${name}\nWhatsApp: ${phone}\nPincode: ${pincode}\nSite: ${site}\nMonthly Bill: ${bill}\n\nPlease share details and a quote.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919216054155?text=${encoded}`, '_blank');
    popupOverlay.classList.remove('active');
});

// ============================
// Solar Calculator
// ============================
const calcBill = document.getElementById('calc-bill');
const calcSlider = document.getElementById('calc-slider');
const calcBtn = document.getElementById('calc-btn');
const calcCity = document.getElementById('calc-city');

function calculateSavings() {
    const bill = parseInt(calcBill.value, 10) || 3000;
    const sunHours = parseFloat(calcCity.value) || 5.15;
    const dailyUnits = (bill / 7.5) / 30;
    const roundedKW = Math.max(1, Math.ceil(dailyUnits / sunHours));
    const monthlySavings = Math.round(bill * 0.85);
    const annualSavings = monthlySavings * 12;
    const centralSubsidy = 95000;
    const stateSubsidy = 17000;
    const netCost = Math.max(0, roundedKW * 55000 - centralSubsidy - stateSubsidy);
    const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0;

    document.getElementById('res-monthly').textContent = '₹' + monthlySavings.toLocaleString('en-IN');
    document.getElementById('res-annual').textContent = '₹' + annualSavings.toLocaleString('en-IN');
    document.getElementById('res-lifetime').textContent = '₹' + ((annualSavings * 25) / 100000).toFixed(1) + ' Lakh';
    document.getElementById('res-subsidy').textContent = '₹' + centralSubsidy.toLocaleString('en-IN');
    document.getElementById('res-state').textContent = '₹' + stateSubsidy.toLocaleString('en-IN');
    document.getElementById('res-payback').textContent = paybackYears < 1 ? 'Under 1 year' : paybackYears.toFixed(1) + ' Years';
}

// Sync slider and input, auto-calculate
calcSlider.addEventListener('input', () => { calcBill.value = calcSlider.value; calculateSavings(); });
calcBill.addEventListener('input', () => { calcSlider.value = calcBill.value; calculateSavings(); });
calcCity.addEventListener('change', calculateSavings);
calculateSavings();
calcBtn.addEventListener('click', () => {
    calculateSavings();
    document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ============================
// Popup (shows after 5 seconds)
// ============================
const popupOverlay = document.getElementById('popup-overlay');
const popupClose = document.getElementById('popup-close');

// Show popup after 5 seconds (only once per session)
if (!sessionStorage.getItem('popupShown')) {
    setTimeout(() => {
        popupOverlay.classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
    }, 5000);
}

// Close popup
popupClose.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
});

// Close on overlay click
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove('active');
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') popupOverlay.classList.remove('active');
});

// ============================
// Smooth Scroll
// ============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
