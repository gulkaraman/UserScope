// Tema & dil yönetimi (tüm sayfalarda ortak)
(() => {
  const THEME_KEY = 'ui-theme';
  const LANG_KEY = 'ui-lang';
  const TEMPLATE_KEY = 'ui-template';
  const DEFAULT_THEME = 'dark';
  const DEFAULT_LANG = 'tr';

  const SUPPORTED_LANGS = ['tr', 'en', 'de', 'fr'];

  const TRANSLATIONS = {
    // Genel
    title_users: {
      tr: 'Kullanıcı Yönetimi',
      en: 'User Management',
      de: 'Benutzerverwaltung',
      fr: "Gestion des utilisateurs",
    },
    title_charts: {
      tr: 'Dağılım Grafikleri',
      en: 'Distribution Charts',
      de: 'Verteilungsdiagramme',
      fr: 'Graphiques de distribution',
    },
    nav_users: {
      tr: 'Kullanıcılar',
      en: 'Users',
      de: 'Benutzer',
      fr: 'Utilisateurs',
    },
    nav_charts: {
      tr: 'Grafikler',
      en: 'Charts',
      de: 'Diagramme',
      fr: 'Graphiques',
    },
    // Form & liste (index)
    form_new_user: {
      tr: 'Yeni Kullanıcı Ekle',
      en: 'Add New User',
      de: 'Neuen Benutzer hinzufügen',
      fr: 'Ajouter un utilisateur',
    },
    form_edit_user: {
      tr: 'Kullanıcıyı Düzenle',
      en: 'Edit User',
      de: 'Benutzer bearbeiten',
      fr: "Modifier l'utilisateur",
    },
    label_name: {
      tr: 'Ad Soyad',
      en: 'Full Name',
      de: 'Vollständiger Name',
      fr: 'Nom complet',
    },
    label_email: {
      tr: 'E-posta',
      en: 'Email',
      de: 'E-Mail',
      fr: 'E-mail',
    },
    label_age: {
      tr: 'Yaş',
      en: 'Age',
      de: 'Alter',
      fr: 'Âge',
    },
    label_gender: {
      tr: 'Cinsiyet',
      en: 'Gender',
      de: 'Geschlecht',
      fr: 'Sexe',
    },
    option_select: {
      tr: 'Seçiniz',
      en: 'Select',
      de: 'Auswählen',
      fr: 'Choisir',
    },
    option_male: {
      tr: 'Erkek',
      en: 'Male',
      de: 'Männlich',
      fr: 'Homme',
    },
    option_female: {
      tr: 'Kadın',
      en: 'Female',
      de: 'Weiblich',
      fr: 'Femme',
    },
    option_other: {
      tr: 'Diğer',
      en: 'Other',
      de: 'Andere',
      fr: 'Autre',
    },
    btn_save: {
      tr: 'Kaydet',
      en: 'Save',
      de: 'Speichern',
      fr: 'Enregistrer',
    },
    btn_update: {
      tr: 'Güncelle',
      en: 'Update',
      de: 'Aktualisieren',
      fr: 'Mettre à jour',
    },
    btn_cancel: {
      tr: 'İptal',
      en: 'Cancel',
      de: 'Abbrechen',
      fr: 'Annuler',
    },
    list_users_title: {
      tr: 'Kullanıcı Listesi',
      en: 'User List',
      de: 'Benutzerliste',
      fr: 'Liste des utilisateurs',
    },
    th_actions: {
      tr: 'İşlemler',
      en: 'Actions',
      de: 'Aktionen',
      fr: 'Actions',
    },
    loading_users: {
      tr: 'Yükleniyor...',
      en: 'Loading...',
      de: 'Wird geladen...',
      fr: 'Chargement...',
    },
    empty_users: {
      tr: 'Henüz kullanıcı yok. Yukarıdan ekleyebilirsiniz.',
      en: 'No users yet. You can add one above.',
      de: 'Noch keine Benutzer. Sie können oben einen hinzufügen.',
      fr: "Aucun utilisateur pour l'instant. Vous pouvez en ajouter un ci-dessus.",
    },

    // Grafik sayfası
    charts_age_title: {
      tr: 'Yaşa Göre Dağılım',
      en: 'Age Distribution',
      de: 'Altersverteilung',
      fr: "Répartition par âge",
    },
    charts_gender_title: {
      tr: 'Cinsiyete Göre Dağılım',
      en: 'Gender Distribution',
      de: 'Geschlechterverteilung',
      fr: 'Répartition par sexe',
    },
    charts_hint: {
      tr: 'Dilime tıklayarak filtreleyin',
      en: 'Click a slice to filter',
      de: 'Zum Filtern auf einen Abschnitt klicken',
      fr: 'Cliquez sur une part pour filtrer',
    },
    filtered_list_title: {
      tr: 'Filtrelenmiş Kullanıcı Listesi',
      en: 'Filtered User List',
      de: 'Gefilterte Benutzerliste',
      fr: "Liste d'utilisateurs filtrée",
    },
    filter_bar_label: {
      tr: 'Aktif filtre',
      en: 'Active filter',
      de: 'Aktiver Filter',
      fr: 'Filtre actif',
    },
    filter_clear: {
      tr: 'Filtreyi temizle',
      en: 'Clear filter',
      de: 'Filter löschen',
      fr: 'Effacer le filtre',
    },
    filter_empty: {
      tr: 'Grafikte bir dilime tıklayın veya tüm listeyi görmek için filtreyi temizleyin.',
      en: 'Click a chart slice or clear the filter to see all records.',
      de: 'Klicken Sie auf einen Diagrammabschnitt oder löschen Sie den Filter, um alle Einträge zu sehen.',
      fr: 'Cliquez sur une part du graphique ou effacez le filtre pour voir tous les enregistrements.',
    },
    empty_filter_result: {
      tr: 'Bu filtreye uygun kullanıcı yok.',
      en: 'No users match this filter.',
      de: 'Keine Benutzer entsprechen diesem Filter.',
      fr: "Aucun utilisateur ne correspond à ce filtre.",
    },

    // Şablon seçici
    template_title: {
      tr: 'Görsel temayı seçin',
      en: 'Choose your visual theme',
      de: 'Wählen Sie Ihr visuelles Thema',
      fr: 'Choisissez votre thème visuel',
    },
    template_subtitle: {
      tr: 'İstediğiniz stili seçin. Tüm özellikler her temada aynıdır.',
      en: 'Pick the style you like. All features work in every theme.',
      de: 'Wählen Sie den gewünschten Stil. Alle Funktionen sind in jedem Thema verfügbar.',
      fr: 'Choisissez le style que vous préférez. Toutes les fonctionnalités sont disponibles dans chaque thème.',
    },
    template_modern_name: {
      tr: 'Modern',
      en: 'Modern',
      de: 'Modern',
      fr: 'Moderne',
    },
    template_modern_desc: {
      tr: 'Cam efektli kartlar, mor vurgu renkleri ve sade, modern bir görünüm.',
      en: 'Glass cards, purple accents and a clean, modern look.',
      de: 'Glaskarten, violette Akzente und ein moderner, klarer Look.',
      fr: 'Cartes effet verre, accents violets et apparence moderne épurée.',
    },
    template_medieval_name: {
      tr: 'Medieval',
      en: 'Medieval',
      de: 'Mittelalterlich',
      fr: 'Médiéval',
    },
    template_medieval_desc: {
      tr: 'Parşömen dokuları, sıcak tonlar ve eski çağlardan ilham alan detaylar.',
      en: 'Parchment textures, warm tones and details inspired by ancient times.',
      de: 'Pergamentstrukturen, warme Töne und von alten Zeiten inspirierte Details.',
      fr: 'Textures parchemin, tons chauds et détails inspirés des temps anciens.',
    },
    template_observatory_name: {
      tr: 'Gözlemevi',
      en: 'Observatory',
      de: 'Observatorium',
      fr: 'Observatoire',
    },
    template_observatory_desc: {
      tr: 'Yıldızlı gece gökyüzü, kozmik renkler ve gözlemevi atmosferi.',
      en: 'Starry night sky, cosmic colors and an observatory atmosphere.',
      de: 'Sternenhimmel, kosmische Farben und Observatoriumsatmosphäre.',
      fr: 'Ciel nocturne étoilé, couleurs cosmiques et ambiance observatoire.',
    },
    template_menu_button: {
      tr: 'Tema',
      en: 'Theme',
      de: 'Thema',
      fr: 'Thème',
    },
    placeholder_name: {
      tr: 'Ad Soyad',
      en: 'Full Name',
      de: 'Vollständiger Name',
      fr: 'Nom complet',
    },
    placeholder_email: {
      tr: 'ornek@email.com',
      en: 'example@email.com',
      de: 'beispiel@email.com',
      fr: 'exemple@email.com',
    },
    btn_edit: {
      tr: 'Düzenle',
      en: 'Edit',
      de: 'Bearbeiten',
      fr: 'Modifier',
    },
    btn_delete: {
      tr: 'Sil',
      en: 'Delete',
      de: 'Löschen',
      fr: 'Supprimer',
    },
    record_count: {
      tr: 'kayıt',
      en: 'records',
      de: 'Einträge',
      fr: 'enregistrements',
    },
  };

  function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  function getTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return DEFAULT_THEME;
  }

  function t(key) {
    const lang = getLang();
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] || entry[DEFAULT_LANG] || Object.values(entry)[0];
  }

  function getTemplate() {
    const stored = localStorage.getItem(TEMPLATE_KEY);
    if (stored === 'modern' || stored === 'medieval' || stored === 'observatory') return stored;
    return null;
  }

  function applyTemplate(template, persist = true) {
    const value =
      template === 'medieval' || template === 'observatory' || template === 'modern'
        ? template
        : 'modern';
    document.body.setAttribute('data-template', value);
    if (persist) {
      localStorage.setItem(TEMPLATE_KEY, value);
    }
  }

  function applyTheme(theme) {
    const value = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', value);
    localStorage.setItem(THEME_KEY, value);
    const sw = document.getElementById('theme-switch');
    if (sw) sw.checked = value === 'light';
  }

  function applyLang(lang) {
    const value = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, value);
    const select = document.getElementById('language-select');
    if (select) select.value = value;

    // Statik metinleri güncelle
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key);
    });
    // Placeholder'ları güncelle
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.placeholder = t(key);
    });

    window.dispatchEvent(new CustomEvent('lang-change', { detail: { lang: value } }));
  }

  function translateGender(val) {
    if (val === 'Erkek') return t('option_male');
    if (val === 'Kadın') return t('option_female');
    if (val === 'Diğer') return t('option_other');
    return val;
  }

  function initControls() {
    applyTheme(getTheme());
    applyLang(getLang());

    // Şablon
    const currentTemplate = getTemplate();
    if (currentTemplate) {
      applyTemplate(currentTemplate, false);
    }

    const sw = document.getElementById('theme-switch');
    if (sw) {
      sw.checked = getTheme() === 'light';
      sw.addEventListener('change', () => {
        applyTheme(sw.checked ? 'light' : 'dark');
      });
    }

    const select = document.getElementById('language-select');
    if (select) {
      select.value = getLang();
      select.addEventListener('change', () => {
        applyLang(select.value);
      });
    }
  }

  window.UI = {
    t,
    getLang,
    getTheme,
    getTemplate,
    applyTheme,
    applyLang,
    applyTemplate,
    translateGender,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initControls();
      setupTemplateSelector();
    });
  } else {
    initControls();
    setupTemplateSelector();
  }

  function setupTemplateSelector() {
    const overlay = document.getElementById('template-overlay');
    if (!overlay) return;

    const initialTemplate = getTemplate();
    overlay.style.display = initialTemplate ? 'none' : 'flex';

    overlay.querySelectorAll('[data-template]').forEach((card) => {
      card.addEventListener('click', () => {
        const tpl = card.getAttribute('data-template');
        applyTemplate(tpl || 'modern', true);
        overlay.style.display = 'none';
        if (typeof window.showToast === 'function') {
          window.showToast(t(`template_${tpl}_name`) + ' teması seçildi.', 'info');
        }
      });
    });

    const btn = document.getElementById('template-open-btn');
    if (btn) {
      btn.textContent = t('template_menu_button');
      btn.addEventListener('click', () => {
        overlay.style.display = 'flex';
      });
    }
  }
})();

