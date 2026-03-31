// ─── Default Configuration ────────────────────────────────────────────────────
const defaultConfig = {
  logo_text:        "Mary's Community Centre",
  hero_title:       "Mary's Community Centre",
  hero_subtitle:    'Empowering vulnerable communities across South Africa through compassionate care, innovative programs, and unwavering dedication to human dignity since 2000.',
  cta_button_text:  'Get Involved ✨',
  background_color: '#FDF8F5',
  accent_color:     '#E8A4B8',
  text_color:       '#374151',
  secondary_color:  '#8FB996',
  surface_color:    '#F8E1E7',
  font_family:      'Quicksand',
  font_size:        16
};

// ─── Mobile Menu Toggle ───────────────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('active');
}

// ─── Contact Form Handler ─────────────────────────────────────────────────────
function handleFormSubmit(event) {
  event.preventDefault();

  const button       = event.target.querySelector('button');
  const originalText = button.innerHTML;

  button.innerHTML = '<span class="relative z-10">✅ Message Received!</span>';
  button.disabled  = true;

  setTimeout(() => {
    document.getElementById('contact-form').reset();
    button.innerHTML = originalText;
    button.disabled  = false;
  }, 3000);
}

// ─── Element SDK Initialisation ───────────────────────────────────────────────
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,

    onConfigChange: async (config) => {

      // Logo text
      const logoText = document.getElementById('logo-text');
      if (logoText) {
        logoText.textContent = config.logo_text || defaultConfig.logo_text;
      }

      // Hero title (last word gets gradient span)
      const heroTitle = document.getElementById('hero-title');
      if (heroTitle) {
        const titleText  = config.hero_title || defaultConfig.hero_title;
        const words      = titleText.split(' ');
        const main       = words.slice(0, -1).join(' ');
        const last       = words.slice(-1);
        heroTitle.innerHTML =
          `${main}<span class="block bg-gradient-to-r from-pink-400 via-rose-400 to-green-400 bg-clip-text text-transparent">${last}</span>`;
      }

      // Hero subtitle
      const heroSubtitle = document.getElementById('hero-subtitle');
      if (heroSubtitle) {
        heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
      }

      // CTA buttons
      const heroCta = document.getElementById('hero-cta');
      const navCta  = document.getElementById('nav-cta');
      const ctaText = config.cta_button_text || defaultConfig.cta_button_text;

      if (heroCta) heroCta.innerHTML = `<span class="relative z-10">${ctaText}</span>`;
      if (navCta)  navCta.innerHTML  = `<span class="relative z-10">${ctaText.replace(' ✨', '')}</span>`;

      // CSS custom properties (colors)
      const root = document.documentElement;
      root.style.setProperty('--cream',       config.background_color || defaultConfig.background_color);
      root.style.setProperty('--deep-rose',   config.accent_color     || defaultConfig.accent_color);
      root.style.setProperty('--sage-green',  config.secondary_color  || defaultConfig.secondary_color);
      root.style.setProperty('--pastel-pink', config.surface_color    || defaultConfig.surface_color);

      // Font family & size
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize   = config.font_size   || defaultConfig.font_size;
      document.body.style.fontFamily = `${fontFamily}, Quicksand, sans-serif`;
      document.body.style.fontSize   = `${fontSize}px`;

      // Heading text colour (skip gradient headings)
      const textColor = config.text_color || defaultConfig.text_color;
      document.querySelectorAll('h1, h2, h3').forEach(el => {
        if (!el.classList.contains('text-transparent')) {
          el.style.color = textColor;
        }
      });
    },

    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: ()      => config.background_color || defaultConfig.background_color,
          set: (value) => { config.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
        },
        {
          get: ()      => config.surface_color || defaultConfig.surface_color,
          set: (value) => { config.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
        },
        {
          get: ()      => config.text_color || defaultConfig.text_color,
          set: (value) => { config.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
        },
        {
          get: ()      => config.accent_color || defaultConfig.accent_color,
          set: (value) => { config.accent_color = value; window.elementSdk.setConfig({ accent_color: value }); }
        },
        {
          get: ()      => config.secondary_color || defaultConfig.secondary_color,
          set: (value) => { config.secondary_color = value; window.elementSdk.setConfig({ secondary_color: value }); }
        }
      ],
      borderables: [],
      fontEditable: {
        get: ()      => config.font_family || defaultConfig.font_family,
        set: (value) => { config.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
      },
      fontSizeable: {
        get: ()      => config.font_size || defaultConfig.font_size,
        set: (value) => { config.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
      }
    }),

    mapToEditPanelValues: (config) => new Map([
      ['logo_text',        config.logo_text        || defaultConfig.logo_text],
      ['hero_title',       config.hero_title        || defaultConfig.hero_title],
      ['hero_subtitle',    config.hero_subtitle     || defaultConfig.hero_subtitle],
      ['cta_button_text',  config.cta_button_text   || defaultConfig.cta_button_text]
    ])
  });
}

// ─── Smooth Scroll + Active Nav Highlight ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // Update active state on desktop nav links only
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      if (this.classList.contains('nav-link')) {
        this.classList.add('active');
      }
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section, .feature-card').forEach(el => {
  el.classList.add('hidden-el');
  observer.observe(el);
});
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.glass-nav');
  if (window.scrollY > 20) {
    nav.classList.add('shadow-lg');
  } else {
    nav.classList.remove('shadow-lg');
  }
});