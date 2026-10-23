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

    const message = `Hi Ellipse Solar,\n\nI am interested in solar installation.\n\nName: ${name}\nWhatsApp: ${phone}\nPincode: ${pincode}\nMonthly Bill: ${bill}\n\nPlease share details and a quote.`;

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

    const message = `Hi Ellipse Solar,\n\nI am interested in solar installation.\n\nName: ${name}\nWhatsApp: ${phone}\nPincode: ${pincode}\nMonthly Bill: ${bill}\n\nPlease share details and a quote.`;

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
    const bill = parseInt(calcBill.value) || 3000;
    const sunHours = parseFloat(calcCity.value);

    const tariff = 7;
    const monthlyUnits = bill / tariff;
    const dailyUnits = monthlyUnits / 30;
    const systemKW = Math.ceil(dailyUnits / sunHours * 10) / 10;
    const roundedKW = Math.ceil(systemKW);

    const monthlySavings = Math.round(bill * 0.85);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25;

    const costPerKW = 55000;
    const systemCost = roundedKW * costPerKW;

    let subsidy = 0;
    if (roundedKW <= 2) subsidy = roundedKW * 30000;
    else if (roundedKW <= 3) subsidy = 60000 + (roundedKW - 2) * 18000;
    else subsidy = 78000;

    const netCost = systemCost - subsidy;
    const paybackYears = (netCost / annualSavings).toFixed(1);

    document.getElementById('res-system').textContent = roundedKW + ' kW';
    document.getElementById('res-monthly').textContent = '₹' + monthlySavings.toLocaleString('en-IN');
    document.getElementById('res-annual').textContent = '₹' + annualSavings.toLocaleString('en-IN');
    document.getElementById('res-lifetime').textContent = '₹' + (lifetimeSavings / 100000).toFixed(1) + ' Lakh';
    document.getElementById('res-cost').textContent = '₹' + systemCost.toLocaleString('en-IN');
    document.getElementById('res-subsidy').textContent = '₹' + subsidy.toLocaleString('en-IN');
    document.getElementById('res-net-cost').textContent = '₹' + netCost.toLocaleString('en-IN');
    document.getElementById('res-payback').textContent = paybackYears + ' Years';
}

// Sync slider and input, auto-calculate
calcSlider.addEventListener('input', () => { calcBill.value = calcSlider.value; calculateSavings(); });
calcBill.addEventListener('input', () => { calcSlider.value = calcBill.value; calculateSavings(); });
calcCity.addEventListener('change', calculateSavings);
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
