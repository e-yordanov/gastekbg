'use strict';

/* ═══════════════════════════════════════
   THEME MANAGER
   Reads OS preference; persists choice.
═══════════════════════════════════════ */
class ThemeManager {
    constructor() {
        this.key     = 'gt-theme';
        this.current = localStorage.getItem(this.key) ||
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.btns    = document.querySelectorAll('[data-theme-toggle]');
        this.apply(this.current);
        this.btns.forEach(btn => btn.addEventListener('click', () => this.toggle()));

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(this.key)) this.apply(e.matches ? 'dark' : 'light');
        });
    }

    toggle() {
        this.current = this.current === 'dark' ? 'light' : 'dark';
        this.apply(this.current);
        localStorage.setItem(this.key, this.current);
    }

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.current = theme;
        this.btns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (!icon) return;
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
}

/* ═══════════════════════════════════════
   LANGUAGE MANAGER
═══════════════════════════════════════ */
class LangManager {
    constructor(onChangeCb) {
        this.key      = 'gt-lang';
        this.onChange = onChangeCb;
        this.current  = localStorage.getItem(this.key) || this._detectLang();
        this._bindBtns();
        this.apply(this.current);
    }

    _detectLang() {
        const param = new URLSearchParams(location.search).get('lang');
        if (param && translations[param]) return param;
        const nav = (navigator.language || '').toLowerCase();
        return nav.startsWith('bg') ? 'bg' : 'bg'; // default BG
    }

    _bindBtns() {
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.apply(btn.dataset.langBtn);
                localStorage.setItem(this.key, this.current);
            });
        });
    }

    apply(lang) {
        if (!translations[lang]) lang = 'bg';
        this.current = lang;

        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langBtn === lang);
        });

        this.onChange(lang, translations[lang]);
    }
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
class Navbar {
    constructor() {
        this.nav        = document.getElementById('navbar');
        this.hamburger  = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobile-menu');
        this._initScroll();
        this._initHamburger();
        this._initActiveLinks();
    }

    _initScroll() {
        const check = () => {
            this.nav.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', check, { passive: true });
        check();
    }

    _initHamburger() {
        this.hamburger.addEventListener('click', () => {
            const open = this.hamburger.classList.toggle('open');
            this.mobileMenu.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        this.mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                this.hamburger.classList.remove('open');
                this.mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    _initActiveLinks() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(s => io.observe(s));
    }
}

/* ═══════════════════════════════════════
   HERO SLIDESHOW
═══════════════════════════════════════ */
class HeroSlider {
    constructor(images) {
        this.images    = images;
        this.current   = 0;
        this.container = document.getElementById('hero-slides');
        this.dots      = document.getElementById('hero-indicators');
        this._build();
        this._startAuto();
    }

    _build() {
        if (!this.container) return;
        this.container.innerHTML = '';
        if (this.dots) this.dots.innerHTML = '';

        this.slides = this.images.map((src, i) => {
            const el = document.createElement('div');
            el.className = 'hero-slide' + (i === 0 ? ' active' : '');
            el.style.backgroundImage = `url(${src})`;
            this.container.appendChild(el);

            if (this.dots) {
                const dot = document.createElement('button');
                dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Слайд ${i + 1}`);
                dot.addEventListener('click', () => this._goTo(i));
                this.dots.appendChild(dot);
            }
            return el;
        });
    }

    _goTo(idx) {
        if (idx === this.current) return;
        this.slides[this.current].classList.remove('active');
        this.current = (idx + this.slides.length) % this.slides.length;
        this.slides[this.current].classList.add('active');
        if (this.dots) {
            this.dots.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === this.current));
        }
    }

    _startAuto() {
        this.timer = setInterval(() => this._goTo(this.current + 1), 5000);
    }
}

/* ═══════════════════════════════════════
   TYPED TEXT
═══════════════════════════════════════ */
class TypedText {
    constructor(el, phrases) {
        this.el      = el;
        this.phrases = phrases;
        this.idx     = 0;
        this.charIdx = 0;
        this.deleting = false;
        this._tick();
    }

    update(phrases) {
        this.phrases  = phrases;
        this.idx      = 0;
        this.charIdx  = 0;
        this.deleting = false;
        clearTimeout(this.timer);
        this._tick();
    }

    _tick() {
        if (!this.el) return;
        const phrase = this.phrases[this.idx % this.phrases.length];

        if (!this.deleting) {
            this.el.textContent = phrase.substring(0, ++this.charIdx);
            if (this.charIdx >= phrase.length) {
                this.deleting = true;
                this.timer = setTimeout(() => this._tick(), 1800);
                return;
            }
        } else {
            this.el.textContent = phrase.substring(0, --this.charIdx);
            if (this.charIdx === 0) {
                this.deleting = false;
                this.idx++;
            }
        }
        this.timer = setTimeout(() => this._tick(), this.deleting ? 60 : 90);
    }
}

/* ═══════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════ */
function animateCounter(el, target, duration = 1600) {
    const start = performance.now();
    const step  = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

/* ═══════════════════════════════════════
   CONTENT RENDERER
═══════════════════════════════════════ */
function renderAll(lang, t) {
    renderTrustBar(t.trustBar);
    renderServices(t.services);
    renderStats(t.stats);
    renderProjects(lang, t.projects);
    renderTestimonials(t.testimonials);
    renderPartners(t.partners);
    renderAbout(lang, t.about);
    renderCerts(lang, t.about);
    renderContactInfoCards(t.contact);
    renderContactForm(t.contact.form);
    renderFooter(t);
    updateStaticI18n(t);
}

function updateStaticI18n(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key   = el.dataset.i18n;
        const parts = key.split('.');
        let val     = t;
        for (const p of parts) val = val?.[p];
        if (typeof val === 'string') el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key   = el.dataset.i18nPlaceholder;
        const parts = key.split('.');
        let val     = t;
        for (const p of parts) val = val?.[p];
        if (typeof val === 'string') el.placeholder = val;
    });
}

function renderTrustBar(items) {
    const el = document.getElementById('trust-bar');
    if (!el) return;
    el.innerHTML = `<div class="trust-bar-inner container">
        ${items.map(i => `
        <div class="trust-item">
            <i class="${i.icon}" aria-hidden="true"></i>
            <span>${i.text}</span>
        </div>`).join('')}
    </div>`;
}

function renderServices(s) {
    const el = document.getElementById('services-grid');
    if (!el) return;
    el.innerHTML = s.items.map((item, i) => `
    <div class="service-card" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="service-icon ${item.color}">
            <i class="${item.icon}" aria-hidden="true"></i>
        </div>
        <h3 class="service-title">${item.title}</h3>
        <p class="service-desc">${item.desc}</p>
    </div>`).join('');
}

function renderStats(stats) {
    const el = document.getElementById('stats-bar');
    if (!el) return;

    el.innerHTML = `<div class="container">
        <div class="stats-bar-inner">
        ${stats.map((s, i) => `
        <div class="stat-item" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
            <div class="stat-label">${s.label}</div>
        </div>`).join('')}
        </div>
    </div>`;

    // Trigger counters when stats-bar enters viewport
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.stat-number').forEach(num => {
                const target = parseInt(num.dataset.target, 10);
                const suffix = num.dataset.suffix || '';
                animateCounter({ set textContent(v) { num.textContent = v + suffix; } }, target);
            });
            io.unobserve(e.target);
        });
    }, { threshold: 0.3 });
    io.observe(el);
}

function renderProjects(lang, p) {
    const el = document.getElementById('projects-grid');
    if (!el) return;
    el.innerHTML = PROJECTS.map((proj, i) => `
    <article class="project-card" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="project-placeholder">
            <i class="${proj.icon}" aria-hidden="true"></i>
        </div>
        <div class="project-body">
            <span class="project-tag">${lang === 'bg' ? proj.tagBg : proj.tagEn}</span>
            <h3 class="project-title">${lang === 'bg' ? proj.titleBg : proj.titleEn}</h3>
            <p class="project-desc">${lang === 'bg' ? proj.descBg : proj.descEn}</p>
        </div>
    </article>`).join('');
}

function renderTestimonials(t) {
    const el = document.getElementById('testimonials-grid');
    if (!el) return;
    el.innerHTML = t.items.map((item, i) => `
    <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="testimonial-quote" aria-hidden="true">&#8220;</div>
        <div class="testimonial-stars" aria-label="5 stars">
            ${'<i class="fas fa-star"></i>'.repeat(5)}
        </div>
        <p class="testimonial-text">${item.text}</p>
        <p class="testimonial-author">${item.author}</p>
    </div>`).join('');
}

function renderPartners(p) {
    const el = document.getElementById('partners-grid');
    if (!el) return;
    el.innerHTML = p.items.map((item, i) => {
        const inner = `<span class="partner-name">${item.name}</span>`;
        return item.url
            ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="partner-card" data-aos="fade-up" data-aos-delay="${i * 80}">${inner}</a>`
            : `<div class="partner-card" data-aos="fade-up" data-aos-delay="${i * 80}">${inner}</div>`;
    }).join('');
}

function renderAbout(lang, a) {
    const el = document.getElementById('about-content');
    if (!el) return;
    el.innerHTML = `
    <div class="about-text">
        <p>${a.p1}</p>
        <p>${a.p2}</p>
    </div>
    <div class="about-cards">
        ${a.cards.map(c => `
        <div class="about-card">
            <div class="about-card-icon"><i class="${c.icon}" aria-hidden="true"></i></div>
            <div class="about-card-body">
                <h4>${c.title}</h4>
                <p>${c.text}</p>
            </div>
        </div>`).join('')}
    </div>`;
}

function renderCerts(lang, a) {
    const el = document.getElementById('certs-grid');
    if (!el) return;

    // Update cert section headings
    ['certsLabel', 'certsTitle', 'certsSubtitle'].forEach(k => {
        const node = document.querySelector(`[data-i18n="about.${k}"]`);
        if (node) node.textContent = a[k];
    });

    // Diploma info card (no image shown)
    const diplomaHtml = `
    <div class="diploma-card" data-aos="fade-up">
        <div class="diploma-icon"><i class="fas fa-graduation-cap" aria-hidden="true"></i></div>
        <div class="diploma-body">
            <h4>${a.diplomaTitle}</h4>
            <p>${a.diplomaText}</p>
        </div>
    </div>`;

    const certsHtml = CERTIFICATES.map((cert, i) => {
        const cap = lang === 'bg' ? cert.captionBg : cert.captionEn;
        return `
        <div class="cert-card" data-cert-idx="${i}" role="button" tabindex="0"
             aria-label="${cap}" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="cert-thumb-wrap">
                <img src="${cert.src}" alt="${cap}" loading="lazy"
                     draggable="false" oncontextmenu="return false">
                <div class="cert-thumb-watermark" data-wm="gastekbg.com" aria-hidden="true"></div>
                <div class="cert-thumb-overlay" aria-hidden="true">
                    <span class="cert-view-icon"><i class="fas fa-search-plus"></i></span>
                    <span class="cert-view-hint">${a.certViewHint}</span>
                </div>
            </div>
            <p class="cert-caption">${cap}</p>
        </div>`;
    }).join('');

    el.innerHTML = certsHtml + diplomaHtml;

    // Bind click events
    el.querySelectorAll('.cert-card').forEach(card => {
        const open = () => certLightbox.open(parseInt(card.dataset.certIdx, 10), lang);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
}

function renderContactInfoCards(contact) {
    const el = document.getElementById('contact-info-cards');
    if (!el) return;
    el.innerHTML = contact.infoCards.map(c => {
        const tag  = c.href ? 'a' : 'div';
        const href = c.href ? ` href="${c.href}"` : '';
        return `<${tag} class="contact-info-card"${href}>
            <div class="contact-info-icon"><i class="${c.icon}" aria-hidden="true"></i></div>
            <div class="contact-info-body">
                <p class="contact-info-label">${c.label}</p>
                <p class="contact-info-value">${c.value}</p>
            </div>
        </${tag}>`;
    }).join('');
}

function renderContactForm(f) {
    const subjectInput = document.getElementById('form-subject');
    if (subjectInput) subjectInput.value = f.subject;

    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${f.submit}`;
    }

    // Update labels and placeholders
    const map = {
        'form-name':    { lbl: f.nameLbl,   ph: f.namePh   },
        'form-email':   { lbl: f.emailLbl,  ph: f.emailPh  },
        'form-phone':   { lbl: f.phoneLbl,  ph: f.phonePh  },
        'form-message': { lbl: f.msgLbl,    ph: f.msgPh    },
    };
    Object.entries(map).forEach(([id, { lbl, ph }]) => {
        const input = document.getElementById(id);
        if (input) input.placeholder = ph;
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) label.textContent = lbl;
    });
}

function renderFooter(t) {
    const linksEl = document.getElementById('footer-links');
    const copyEl  = document.getElementById('footer-copy');
    const extEl   = document.getElementById('footer-ext');
    const nav = t.nav;

    if (linksEl) {
        const navKeys = ['home', 'services', 'projects', 'about', 'contact'];
        const hrefs   = { home: '#home', services: '#services', projects: '#projects', about: '#about', contact: '#contact' };
        linksEl.innerHTML = navKeys.map(k => `
            <a href="${hrefs[k]}" class="footer-link">${nav[k]}</a>`).join('');
    }

    if (extEl) {
        const c = t.contact;
        const useful = t.partners.items.filter(p => p.url);
        extEl.innerHTML = `
        <div class="footer-col">
            <p class="footer-col-title">${t.footer.usefulLinks}</p>
            ${useful.map(p => `<a href="${p.url}" class="footer-ext-link" target="_blank" rel="noopener noreferrer">${p.name}</a>`).join('')}
        </div>
        <div class="footer-col">
            <p class="footer-col-title">${t.footer.contactTitle}</p>
            ${c.infoCards.slice(0,2).map(i => `<p class="footer-ext-info">${i.href ? `<a href="${i.href}" class="footer-ext-link">${i.value}</a>` : i.value}</p>`).join('')}
            <p class="footer-ext-info">${c.infoCards[2]?.value || ''}</p>
        </div>`;
    }

    if (copyEl) {
        copyEl.textContent = `© ${new Date().getFullYear()} Газтек. ${t.footer.copy}`;
    }
}

/* ═══════════════════════════════════════
   CERTIFICATE LIGHTBOX
═══════════════════════════════════════ */
const certLightbox = (() => {
    let currentIdx = 0;
    let currentLang = 'bg';

    const overlay  = document.getElementById('cert-lightbox');
    const img      = document.getElementById('cert-lightbox-img');
    const caption  = document.getElementById('cert-lightbox-caption');
    const closeBtn = document.getElementById('cert-lightbox-close');
    const prevBtn  = document.getElementById('cert-lightbox-prev');
    const nextBtn  = document.getElementById('cert-lightbox-next');

    function open(idx, lang) {
        currentIdx  = idx;
        currentLang = lang;
        _render();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function _render() {
        const cert = CERTIFICATES[currentIdx];
        if (!cert || !img) return;
        img.src = cert.src;
        img.alt = currentLang === 'bg' ? cert.captionBg : cert.captionEn;
        if (caption) caption.textContent = currentLang === 'bg' ? cert.captionBg : cert.captionEn;
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn)  prevBtn.addEventListener('click', () => { currentIdx = (currentIdx - 1 + CERTIFICATES.length) % CERTIFICATES.length; _render(); });
    if (nextBtn)  nextBtn.addEventListener('click', () => { currentIdx = (currentIdx + 1) % CERTIFICATES.length; _render(); });

    if (overlay) {
        overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    }

    document.addEventListener('keydown', e => {
        if (!overlay?.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft' && prevBtn)  prevBtn.click();
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });

    return { open, close };
})();

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
function initContactForm(getLang) {
    const form   = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const t = translations[getLang()];
        const f = t?.contact?.form || {};
        const btn = form.querySelector('.form-submit');

        if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
        if (status) { status.className = 'form-status'; status.style.display = 'none'; }

        try {
            const data = new FormData(form);
            const res  = await fetch(form.action, {
                method: 'POST',
                body:   data,
                headers: { 'Accept': 'application/json' },
            });

            if (res.ok) {
                form.reset();
                if (status) {
                    status.textContent  = f.success || 'Thank you!';
                    status.className    = 'form-status success';
                    status.style.display = 'block';
                }
            } else {
                throw new Error('Server error');
            }
        } catch {
            if (status) {
                status.textContent  = f.error || 'Error. Please try again.';
                status.className    = 'form-status error';
                status.style.display = 'block';
            }
        } finally {
            if (btn) { btn.disabled = false; btn.style.opacity = ''; }
        }
    });
}

/* ═══════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════ */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════
   INITIALISE
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const theme = new ThemeManager();

    let typed = null;

    const lang = new LangManager((langCode, t) => {
        renderAll(langCode, t);
        if (typed) {
            typed.update(t.hero.typed);
        } else {
            typed = new TypedText(document.getElementById('typed-text'), t.hero.typed);
        }
        // Re-bind cert cards after re-render
        document.querySelectorAll('.cert-card').forEach(card => {
            card.addEventListener('click', () => certLightbox.open(parseInt(card.dataset.certIdx, 10), langCode));
        });
    });

    new Navbar();
    new HeroSlider(HERO_IMAGES);
    initBackToTop();
    initContactForm(() => lang.current);

    AOS.init({
        duration: 600,
        once:     true,
        offset:   60,
    });
});
