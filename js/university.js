import { buildSearchIndex, filterAnnouncements } from './search.js';
import { getFavorites, toggleFavorite } from './favorites.js';

const state = {
  universities: [],
  announcements: [],
  searchIndex: [],
  selectedFilters: [],
  searchTerm: '',
  favorites: getFavorites(),
  language: localStorage.getItem('university-hub-language') || 'en',
};

const ui = {
  universitiesGrid: document.querySelector('#universities-grid'),
  favoritesGrid: document.querySelector('#favorites-grid'),
  announcementFeed: document.querySelector('#announcement-feed'),
  filterChips: document.querySelector('#filter-chips'),
  resultsSummary: document.querySelector('#results-summary'),
  favoriteSummary: document.querySelector('#favorites-summary'),
  totalUniversities: document.querySelector('#total-universities'),
  totalAnnouncements: document.querySelector('#total-announcements'),
  openAdmissions: document.querySelector('#open-admissions'),
  favoritesCount: document.querySelector('#favorites-count'),
  countdownList: document.querySelector('#countdown-list'),
  calendarTimeline: document.querySelector('#calendar-timeline'),
  searchInput: document.querySelector('#global-search'),
  modal: document.querySelector('#university-modal'),
  modalBody: document.querySelector('#modal-body'),
  modalClose: document.querySelector('.modal-close'),
  languageToggle: document.querySelector('#language-toggle'),
};

const filters = ['TCAS', 'Portfolio', 'Quota', 'Admission', 'Direct Admission', 'Scholarship', 'Open House'];

const translations = {
  en: {
    navDirectory: 'Directory',
    navAnnouncements: 'Announcements',
    navFavorites: 'Favorites',
    navBack: 'Back to portfolio',
    pageTitle: 'University Hub',
    eyebrow: 'University Hub',
    heroText: 'A centralized dashboard for Thai university admissions, TCAS announcements, scholarships, open house events, and application deadlines.',
    searchPlaceholder: 'Search universities, faculties, categories, or keywords...',
    exploreUniversities: 'Explore universities',
    viewAnnouncements: 'View announcements',
    statUniversities: 'Total universities',
    statAnnouncements: 'Total announcements',
    statAdmissions: 'Open admissions',
    statFavorites: 'Favorites',
    filtersEyebrow: 'Filters',
    filtersTitle: 'Explore by category',
    resultsDefault: 'Showing all announcements',
    directoryEyebrow: 'Directory',
    directoryTitle: 'University directory',
    directoryNote: 'Modern glass cards for every university',
    favoritesEyebrow: 'Saved',
    favoritesTitle: 'Favorites',
    favoritesSummaryDefault: '0 favorites saved',
    feedEyebrow: 'Feed',
    feedTitle: 'Announcement feed',
    feedNote: 'Newest announcements first',
    countdownEyebrow: 'Countdown',
    countdownTitle: 'Upcoming deadlines',
    calendarEyebrow: 'Calendar',
    calendarTitle: 'Important dates',
    viewDetails: 'View details',
    officialWebsite: 'Official website',
    openAnnouncement: 'Open announcement',
    noFavorites: 'No favorites yet. Save your preferred universities to keep them here.',
    noAnnouncements: 'No announcements match your search. Try another keyword or filter.',
    showingAnnouncements: 'Showing {count} announcement(s)',
    noAnnouncementsMatch: 'No announcements match the current filters',
    favoritesSaved: '{count} favorites saved',
    about: 'About',
    admissionWebsite: 'Admission website',
    visitOfficialWebsite: 'Visit official website',
    recentAnnouncements: 'Recent announcements',
    noAnnouncementsYet: 'No announcements available yet.',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    universityDirectoryTitle: 'University directory',
  },
  th: {
    navDirectory: 'รายชื่อมหาวิทยาลัย',
    navAnnouncements: 'ประกาศ',
    navFavorites: 'รายการโปรด',
    navBack: 'กลับไปยังหน้า Portfolio',
    pageTitle: 'University Hub',
    eyebrow: 'University Hub',
    heroText: 'แดชบอร์ดกลางสำหรับประกาศรับสมัครมหาวิทยาลัยไทย TCAS ทุนการศึกษา งาน Open House และกำหนดส่งใบสมัคร',
    searchPlaceholder: 'ค้นหา มหาวิทยาลัย คณะ หมวดหมู่ หรือคำสำคัญ...',
    exploreUniversities: 'ดูมหาวิทยาลัย',
    viewAnnouncements: 'ดูประกาศ',
    statUniversities: 'มหาวิทยาลัยทั้งหมด',
    statAnnouncements: 'ประกาศทั้งหมด',
    statAdmissions: 'เปิดรับสมัคร',
    statFavorites: 'รายการโปรด',
    filtersEyebrow: 'ตัวกรอง',
    filtersTitle: 'ค้นหาโดยหมวดหมู่',
    resultsDefault: 'แสดงประกาศทั้งหมด',
    directoryEyebrow: 'รายการ',
    directoryTitle: 'ไดเรกทอรีมหาวิทยาลัย',
    directoryNote: 'การ์ดสไตล์ glassmorphism สำหรับทุกมหาวิทยาลัย',
    favoritesEyebrow: 'ที่บันทึกไว้',
    favoritesTitle: 'รายการโปรด',
    favoritesSummaryDefault: 'บันทึกไว้ 0 รายการ',
    feedEyebrow: 'ฟีด',
    feedTitle: 'ฟีดประกาศ',
    feedNote: 'จัดเรียงประกาศล่าสุดก่อน',
    countdownEyebrow: 'นับถอยหลัง',
    countdownTitle: 'กำหนดส่งสมัครใกล้เข้ามา',
    calendarEyebrow: 'ปฏิทิน',
    calendarTitle: 'วันที่สำคัญ',
    viewDetails: 'ดูรายละเอียด',
    officialWebsite: 'เว็บไซต์อย่างเป็นทางการ',
    openAnnouncement: 'เปิดประกาศ',
    noFavorites: 'ยังไม่มีรายการโปรด กดเพิ่มมหาวิทยาลัยที่ต้องการไว้ที่นี่',
    noAnnouncements: 'ไม่มีประกาศที่ตรงกับการค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรอง',
    showingAnnouncements: 'แสดงประกาศ {count} รายการ',
    noAnnouncementsMatch: 'ไม่มีประกาศที่ตรงกับตัวกรองปัจจุบัน',
    favoritesSaved: 'บันทึกไว้ {count} รายการ',
    about: 'เกี่ยวกับ',
    admissionWebsite: 'เว็บไซต์รับสมัคร',
    visitOfficialWebsite: 'เยี่ยมชมเว็บไซต์อย่างเป็นทางการ',
    recentAnnouncements: 'ประกาศล่าสุด',
    noAnnouncementsYet: 'ยังไม่มีประกาศสำหรับมหาวิทยาลัยนี้',
    days: 'วัน',
    hours: 'ชั่วโมง',
    minutes: 'นาที',
    seconds: 'วินาที',
    universityDirectoryTitle: 'ไดเรกทอรีมหาวิทยาลัย',
  },
};

async function loadData() {
  const [universities, announcements] = await Promise.all([
    fetch('data/universities.json').then((res) => res.json()),
    fetch('data/announcements.json').then((res) => res.json()),
  ]);

  state.universities = universities;
  state.announcements = announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
  state.searchIndex = buildSearchIndex(state.universities, state.announcements);

  buildFilters();
  renderStats();
  renderUniversities();
  renderFavorites();
  renderAnnouncements();
  renderCountdown();
  renderCalendar();
  setupEvents();
  applyTranslations();
  observeRevealSections();
}

function buildFilters() {
  ui.filterChips.innerHTML = '';

  filters.forEach((filter) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-chip${state.selectedFilters.includes(filter) ? ' active' : ''}`;
    button.textContent = filter;
    button.setAttribute('aria-pressed', state.selectedFilters.includes(filter) ? 'true' : 'false');

    button.addEventListener('click', () => {
      if (state.selectedFilters.includes(filter)) {
        state.selectedFilters = state.selectedFilters.filter((item) => item !== filter);
      } else {
        state.selectedFilters = [...state.selectedFilters, filter];
      }

      renderAnnouncements();
      buildFilters();
    });

    ui.filterChips.appendChild(button);
  });
}

function renderStats() {
  ui.totalUniversities.textContent = String(state.universities.length);
  ui.totalAnnouncements.textContent = String(state.announcements.length);
  ui.openAdmissions.textContent = String(state.announcements.filter((item) => item.category !== 'Scholarship').length);
  ui.favoritesCount.textContent = String(state.favorites.length);
}

function t(key, params = {}) {
  const dictionary = translations[state.language] || translations.en;
  const template = dictionary[key] || translations.en[key] || key;

  return Object.entries(params).reduce((result, [name, value]) => {
    return result.replace(new RegExp(`\\{${name}\\}`, 'g'), value);
  }, template);
}

function applyTranslations() {
  const dictionary = translations[state.language] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  if (ui.languageToggle) {
    ui.languageToggle.textContent = state.language === 'en' ? 'TH' : 'EN';
    ui.languageToggle.setAttribute(
      'aria-label',
      state.language === 'en' ? 'Switch language to Thai' : 'Switch language to English'
    );
  }

  document.documentElement.lang = state.language;
}

function renderUniversities() {
  ui.universitiesGrid.innerHTML = '';

  state.universities.forEach((university) => {
    const card = document.createElement('article');
    card.className = 'university-card reveal';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${university.name}`);

    const isFavorite = state.favorites.includes(university.id);

    card.innerHTML = `
      <div class="card-top">
        <div class="logo-wrap">
          <img src="${university.logo}" alt="${university.name} logo" />
        </div>
        <button
          class="favorite-button ${isFavorite ? 'active' : ''}"
          type="button"
          data-university-id="${university.id}"
          aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'} ${university.name}"
          aria-pressed="${isFavorite}"
        >
          ${isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div class="university-meta">
        <span class="short-name">${university.shortName}</span>
        <h3>${university.name}</h3>
      </div>

      <p class="province">${university.province}</p>

      <div class="card-body">
        <p>${university.description}</p>
      </div>

      <div class="card-actions">
        <button class="action-button" type="button" data-open-details="${university.id}">${t('viewDetails')}</button>
        <a class="external-link" href="${university.admissionWebsite}" target="_blank" rel="noreferrer">${t('officialWebsite')}</a>
      </div>
    `;

    card.addEventListener('click', (event) => {
      if (event.target.closest('.favorite-button')) {
        return;
      }

      if (event.target.closest('[data-open-details]')) {
        openUniversityModal(university.id);
        return;
      }

      openUniversityModal(university.id);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openUniversityModal(university.id);
      }
    });

    const favoriteButton = card.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      state.favorites = toggleFavorite(university.id);
      renderFavorites();
      renderStats();
      renderUniversities();
      buildFilters();
    });

    ui.universitiesGrid.appendChild(card);
  });

  observeRevealSections();
}

function renderFavorites() {
  ui.favoritesGrid.innerHTML = '';
  const favoriteUniversities = state.universities.filter((university) => state.favorites.includes(university.id));

  ui.favoriteSummary.textContent = favoriteUniversities.length
    ? t('favoritesSaved', { count: favoriteUniversities.length })
    : t('favoritesSummaryDefault');

  if (!favoriteUniversities.length) {
    ui.favoritesGrid.innerHTML = `<div class="empty-state">${t('noFavorites')}</div>`;
    return;
  }

  favoriteUniversities.forEach((university) => {
    const card = document.createElement('article');
    card.className = 'favorite-card';
    card.innerHTML = `
      <div class="card-top">
        <div class="logo-wrap">
          <img src="${university.logo}" alt="${university.name} logo" />
        </div>
        <button class="favorite-button active" type="button" data-university-id="${university.id}" aria-label="Remove ${university.name} from favorites">♥</button>
      </div>
      <div class="university-meta">
        <span class="short-name">${university.shortName}</span>
        <h3>${university.name}</h3>
      </div>
      <p class="province">${university.province}</p>
      <div class="card-actions">
        <button class="action-button" type="button" data-open-details="${university.id}">${t('viewDetails')}</button>
        <a class="external-link" href="${university.admissionWebsite}" target="_blank" rel="noreferrer">${t('officialWebsite')}</a>
      </div>
    `;

    card.querySelector('[data-open-details]').addEventListener('click', () => openUniversityModal(university.id));
    card.querySelector('.favorite-button').addEventListener('click', () => {
      state.favorites = toggleFavorite(university.id);
      renderFavorites();
      renderStats();
      renderUniversities();
      buildFilters();
    });

    ui.favoritesGrid.appendChild(card);
  });
}

function renderAnnouncements() {
  ui.announcementFeed.innerHTML = '';

  const filteredAnnouncements = filterAnnouncements(state.searchIndex, state.searchTerm, state.selectedFilters);

  ui.resultsSummary.textContent = filteredAnnouncements.length
    ? t('showingAnnouncements', { count: filteredAnnouncements.length })
    : t('noAnnouncementsMatch');

  if (!filteredAnnouncements.length) {
    ui.announcementFeed.innerHTML = `<div class="empty-state">${t('noAnnouncements')}</div>`;
    return;
  }

  filteredAnnouncements.forEach((announcement) => {
    const university = state.universities.find((item) => item.id === announcement.universityId);
    if (!university) return;

    const article = document.createElement('article');
    article.className = 'announcement-card reveal';
    article.innerHTML = `
      <div class="logo-wrap">
        <img src="${university.logo}" alt="${university.name} logo" />
      </div>

      <div class="announcement-content">
        <div class="announcement-topline">
          <span>${university.name}</span>
          <span>•</span>
          <span>${formatDate(announcement.date)}</span>
        </div>
        <h3>${announcement.title}</h3>
        <div class="announcement-meta">
          <span>Faculty: ${announcement.faculty}</span>
          <span>Deadline: ${formatDate(announcement.deadline)}</span>
        </div>
      </div>

      <div class="announcement-side">
        <span class="category-pill">${announcement.category}</span>
        <a class="external-link" href="${announcement.link}" target="_blank" rel="noreferrer">${t('openAnnouncement')}</a>
      </div>
    `;

    ui.announcementFeed.appendChild(article);
  });

  observeRevealSections();
}

function renderCountdown() {
  ui.countdownList.innerHTML = '';

  const upcoming = [...state.announcements]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  upcoming.forEach((announcement) => {
    const university = state.universities.find((item) => item.id === announcement.universityId);
    const countdown = getCountdownParts(announcement.deadline);

    const item = document.createElement('article');
    item.className = 'countdown-item';
    item.innerHTML = `
      <div class="countdown-header">
        <strong>${announcement.title}</strong>
        <span>${university?.shortName || 'Uni'}</span>
      </div>
      <div class="countdown-timer">
        <div class="time-box"><strong>${countdown.days}</strong><span>${t('days')}</span></div>
        <div class="time-box"><strong>${countdown.hours}</strong><span>${t('hours')}</span></div>
        <div class="time-box"><strong>${countdown.minutes}</strong><span>${t('minutes')}</span></div>
        <div class="time-box"><strong>${countdown.seconds}</strong><span>${t('seconds')}</span></div>
      </div>
    `;

    ui.countdownList.appendChild(item);
  });
}

function renderCalendar() {
  ui.calendarTimeline.innerHTML = '';

  const upcomingDates = [...state.announcements]
    .map((announcement) => ({
      title: announcement.title,
      university: state.universities.find((item) => item.id === announcement.universityId)?.name || 'Unknown university',
      date: announcement.deadline,
      type: announcement.category,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  upcomingDates.forEach((item) => {
    const entry = document.createElement('article');
    entry.className = 'timeline-item';
    entry.innerHTML = `
      <h4>${item.title}</h4>
      <p><strong>${item.university}</strong></p>
      <p>${item.type} • ${formatDate(item.date)}</p>
    `;

    ui.calendarTimeline.appendChild(entry);
  });
}

function setupEvents() {
  ui.searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
    renderAnnouncements();
  });

  ui.languageToggle.addEventListener('click', () => {
    state.language = state.language === 'en' ? 'th' : 'en';
    localStorage.setItem('university-hub-language', state.language);
    applyTranslations();
    renderUniversities();
    renderFavorites();
    renderAnnouncements();
  });

  ui.modalClose.addEventListener('click', () => {
    ui.modal.close();
  });

  ui.modal.addEventListener('click', (event) => {
    if (event.target === ui.modal) {
      ui.modal.close();
    }
  });
}

function openUniversityModal(universityId) {
  const university = state.universities.find((item) => item.id === universityId);
  if (!university) return;

  const relatedAnnouncements = state.searchIndex.filter((item) => item.universityId === universityId).slice(0, 4);

  ui.modalBody.innerHTML = `
    <div class="modal-header">
      <div class="logo-wrap">
        <img src="${university.logo}" alt="${university.name} logo" />
      </div>
      <div>
        <h3 id="modal-title">${university.name}</h3>
        <p>${university.shortName} • ${university.province}</p>
      </div>
    </div>

    <div class="modal-body">
      <div class="modal-section">
        <h4>${t('about')}</h4>
        <p>${university.description}</p>
      </div>

      <div class="modal-section">
        <h4>${t('admissionWebsite')}</h4>
        <div class="modal-links">
          <a href="${university.admissionWebsite}" target="_blank" rel="noreferrer">${t('visitOfficialWebsite')}</a>
        </div>
      </div>

      <div class="modal-section">
        <h4>${t('recentAnnouncements')}</h4>
        <ul>
          ${relatedAnnouncements.length ? relatedAnnouncements.map((announcement) => `
            <li>
              <strong>${announcement.title}</strong>
              <div>${announcement.category} • ${formatDate(announcement.deadline)}</div>
              ${announcement.description ? `<div>${announcement.description}</div>` : ''}
              ${announcement.details && announcement.details.length ? `<div>${announcement.details.map((detail) => `• ${detail}`).join('<br>')}</div>` : ''}
            </li>
          `).join('') : `<li>${t('noAnnouncementsYet')}</li>`}
        </ul>
      </div>
    </div>
  `;

  ui.modal.showModal();
}

function observeRevealSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
}

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function getCountdownParts(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = Math.max(target.getTime() - now.getTime(), 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function startLiveCountdown() {
  renderCountdown();
  setInterval(renderCountdown, 1000);
}

loadData().then(() => {
  startLiveCountdown();
});
