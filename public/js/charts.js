const API = '/api/users';
const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];
const COLORS_GENDER = ['#3b82f6', '#ec4899', '#10b981'];

let ageChart, genderChart;
let currentFilter = { yas_min: null, yas_max: null, cinsiyet: null };

function trUi(key) {
  if (window.UI && typeof window.UI.t === 'function') {
    return window.UI.t(key);
  }
  return key;
}

function translateGender(val) {
  if (window.UI && typeof window.UI.translateGender === 'function') {
    return window.UI.translateGender(val);
  }
  return val;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showFilterInfo(text) {
  const el = document.getElementById('filter-info');
  document.getElementById('filter-text').textContent = text;
  el.style.display = 'block';
}

function hideFilterInfo() {
  document.getElementById('filter-info').style.display = 'none';
  document.getElementById('list-subtitle').textContent = '';
}

function setFilter(ops) {
  currentFilter = { ...currentFilter, ...ops };
}

function clearFilter() {
  currentFilter = { yas_min: null, yas_max: null, cinsiyet: null };
  hideFilterInfo();
  loadFilteredUsers();
}

async function loadFilteredUsers() {
  const tbody = document.getElementById('filtered-tbody');
  const params = new URLSearchParams();
  if (currentFilter.yas_min != null) params.set('yas_min', currentFilter.yas_min);
  if (currentFilter.yas_max != null) params.set('yas_max', currentFilter.yas_max);
  if (currentFilter.cinsiyet) params.set('cinsiyet', currentFilter.cinsiyet);
  const url = params.toString() ? `${API}?${params}` : API;
  try {
    console.debug('[LOAD_FILTERED_USERS] URL:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Liste alınamadı');
    const users = await res.json();
    console.debug('[LOAD_FILTERED_USERS] Kayıt sayısı:', users.length, 'Filtre:', currentFilter);
    const subtitle = document.getElementById('list-subtitle');
    if (currentFilter.cinsiyet || currentFilter.yas_min != null || currentFilter.yas_max != null) {
      let t = [];
      if (currentFilter.cinsiyet) t.push(trUi('label_gender') + ': ' + translateGender(currentFilter.cinsiyet));
      if (currentFilter.yas_min != null && currentFilter.yas_max != null) t.push(trUi('label_age') + ': ' + currentFilter.yas_min + '-' + currentFilter.yas_max);
      else if (currentFilter.yas_min != null) t.push(trUi('label_age') + ': ' + currentFilter.yas_min + '+');
      subtitle.textContent = '(' + t.join(', ') + ') — ' + users.length + ' ' + trUi('record_count');
    } else {
      subtitle.textContent = '— ' + users.length + ' ' + trUi('record_count');
    }
    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">${trUi('empty_filter_result')}</td></tr>`;
      return;
    }
    tbody.innerHTML = users.map(u => `
      <tr>
        <td>${escapeHtml(u.ad_soyad)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${u.yas}</td>
        <td>${escapeHtml(translateGender(u.cinsiyet))}</td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('[LOAD_FILTERED_USERS] Hata:', err);
    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">Veri yüklenirken hata oluştu.</td></tr>';
  }
}

// Yaş grubu etiketinden min/max çıkar (0-19 -> 0,19; 20-29 -> 20,29; 60+ -> 60,null)
function ageGroupToRange(label) {
  if (label === '60+') return { yas_min: 60, yas_max: 120 };
  const m = label.match(/^(\d+)-(\d+)$/);
  if (m) return { yas_min: parseInt(m[1], 10), yas_max: parseInt(m[2], 10) };
  return {};
}

async function fetchAgeStats() {
  const res = await fetch(API + '/stats/age');
  if (!res.ok) throw new Error('Yaş istatistikleri alınamadı');
  return res.json();
}

async function fetchGenderStats() {
  const res = await fetch(API + '/stats/gender');
  if (!res.ok) throw new Error('Cinsiyet istatistikleri alınamadı');
  return res.json();
}

function buildAgeChart(data) {
  const ctx = document.getElementById('age-chart').getContext('2d');
  const labels = data.map(d => d.yas_grubu);
  const values = data.map(d => Number(d.adet));
  if (ageChart) ageChart.destroy();
  ageChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderColor: '#16161a',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const t = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const p = t ? ((ctx.raw / t) * 100).toFixed(1) : 0;
              return ctx.label + ': ' + ctx.raw + ' kişi (' + p + '%)';
            }
          }
        }
      },
      onClick: (_ev, elements) => {
        if (elements.length === 0) return;
        const i = elements[0].index;
        const label = labels[i];
        const range = ageGroupToRange(label);
        setFilter(range);
        showFilterInfo('Filtre: Yaş grubu «' + label + '»');
        if (typeof window.showToast === 'function') {
          window.showToast('Yaş grubu filtresi uygulandı: ' + label, 'info');
        }
        loadFilteredUsers();
      }
    }
  });
}

function buildGenderChart(data) {
  const ctx = document.getElementById('gender-chart').getContext('2d');
  const labels = data.map(d => translateGender(d.cinsiyet));
  const values = data.map(d => Number(d.adet));
  if (genderChart) genderChart.destroy();
  genderChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: COLORS_GENDER.slice(0, labels.length),
        borderColor: '#16161a',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const t = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const p = t ? ((ctx.raw / t) * 100).toFixed(1) : 0;
              return ctx.label + ': ' + ctx.raw + ' kişi (' + p + '%)';
            }
          }
        }
      },
      onClick: (_ev, elements) => {
        if (elements.length === 0) return;
        const i = elements[0].index;
        const cinsiyet = data[i].cinsiyet;
        setFilter({ yas_min: null, yas_max: null, cinsiyet });
        showFilterInfo('Filtre: Cinsiyet «' + translateGender(cinsiyet) + '»');
        if (typeof window.showToast === 'function') {
          window.showToast('Cinsiyet filtresi uygulandı: ' + cinsiyet, 'info');
        }
        loadFilteredUsers();
      }
    }
  });
}

document.getElementById('clear-filter').addEventListener('click', (e) => {
  e.preventDefault();
  clearFilter();
  if (typeof window.showToast === 'function') {
    window.showToast('Filtre temizlendi, tüm kayıtlar gösteriliyor.', 'info');
  }
});

async function init() {
  try {
    console.debug('[CHART_INIT] İstatistikler yükleniyor...');
    const [ageData, genderData] = await Promise.all([fetchAgeStats(), fetchGenderStats()]);
    console.debug('[CHART_INIT] Yaş grupları:', ageData, 'Cinsiyet:', genderData);
    buildAgeChart(ageData);
    buildGenderChart(genderData);
    loadFilteredUsers();
  } catch (err) {
    console.error('[CHART_INIT] Hata:', err);
    if (typeof window.showToast === 'function') {
      window.showToast('Grafik verileri yüklenemedi. Sunucu ve veritabanını kontrol edin.', 'error');
    }
    document.getElementById('filtered-tbody').innerHTML =
      '<tr><td colspan="4" class="empty-state">İstatistikler yüklenemedi. Sunucu ve veritabanı çalışıyor mu?</td></tr>';
  }
}

init();
window.addEventListener('lang-change', () => {
  loadFilteredUsers();
  Promise.all([fetchAgeStats(), fetchGenderStats()]).then(([ageData, genderData]) => {
    buildAgeChart(ageData);
    buildGenderChart(genderData);
  }).catch(() => {});
});
