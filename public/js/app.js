const API = '/api/users';

function trUi(key) {
  if (window.UI && typeof window.UI.t === 'function') {
    return window.UI.t(key);
  }
  return key;
}

function showAlert(message, type = 'success') {
  // toast üzerinden uyarı göster + debug log
  console.debug('[FORM ALERT]', type.toUpperCase(), message);
  if (typeof window.showToast === 'function') {
    window.showToast(message, type === 'error' ? 'error' : 'success');
  } else {
    alert(message);
  }
}

function getFormData() {
  return {
    ad_soyad: document.getElementById('ad_soyad').value.trim(),
    email: document.getElementById('email').value.trim(),
    yas: parseInt(document.getElementById('yas').value, 10) || 0,
    cinsiyet: document.getElementById('cinsiyet').value
  };
}

function setFormData(user) {
  document.getElementById('user-id').value = user.id;
  document.getElementById('ad_soyad').value = user.ad_soyad || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('yas').value = user.yas || '';
  document.getElementById('cinsiyet').value = user.cinsiyet || '';
  document.getElementById('form-title').textContent = trUi('form_edit_user');
  document.getElementById('submit-btn').textContent = trUi('btn_update');
  document.getElementById('cancel-btn').style.display = 'inline-flex';
}

function resetForm() {
  document.getElementById('user-form').reset();
  document.getElementById('user-id').value = '';
  document.getElementById('form-title').textContent = trUi('form_new_user');
  document.getElementById('submit-btn').textContent = trUi('btn_save');
  document.getElementById('cancel-btn').style.display = 'none';
}

async function loadUsers() {
  const tbody = document.getElementById('user-list');
  tbody.innerHTML = `<tr><td colspan="5" class="empty-state">${trUi('loading_users')}</td></tr>`;
  try {
    console.debug('[LOAD_USERS] İstek gönderiliyor', API);
    const res = await fetch(API);
    if (!res.ok) throw new Error('Liste alınamadı');
    const users = await res.json();
    console.debug('[LOAD_USERS] Başarılı, kayıt sayısı:', users.length);
    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="empty-state">${trUi('empty_users')}</td></tr>`;
      return;
    }
    tbody.innerHTML = users.map(u => `
      <tr>
        <td>${escapeHtml(u.ad_soyad)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${u.yas}</td>
        <td>${escapeHtml(translateGender(u.cinsiyet))}</td>
        <td>
          <div class="actions">
            <button type="button" class="btn btn-secondary btn-sm" data-edit="${u.id}">${escapeHtml(trUi('btn_edit'))}</button>
            <button type="button" class="btn btn-danger btn-sm" data-delete="${u.id}">${escapeHtml(trUi('btn_delete'))}</button>
          </div>
        </td>
      </tr>
    `).join('');
    tbody.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => editUser(parseInt(btn.getAttribute('data-edit'), 10)));
    });
    tbody.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteUser(parseInt(btn.getAttribute('data-delete'), 10)));
    });
  } catch (err) {
    console.error('[LOAD_USERS] Hata:', err);
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Liste yüklenirken hata oluştu. Sunucu ve MySQL çalışıyor mu?</td></tr>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function translateGender(val) {
  if (window.UI && typeof window.UI.translateGender === 'function') {
    return window.UI.translateGender(val);
  }
  return val;
}

async function editUser(id) {
  try {
    console.debug('[EDIT_USER] ID:', id);
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error('Kullanıcı getirilemedi');
    const user = await res.json();
    console.debug('[EDIT_USER] Kullanıcı yüklendi:', user);
    setFormData(user);
  } catch (err) {
    console.error('[EDIT_USER] Hata:', err);
    showAlert(err.message || 'Düzenleme yüklenemedi', 'error');
  }
}

async function deleteUser(id) {
  if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
  try {
    console.debug('[DELETE_USER] İstek, ID:', id);
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Silinemedi');
    }
    showAlert('Kullanıcı silindi.', 'success');
    resetForm();
    loadUsers();
  } catch (err) {
    console.error('[DELETE_USER] Hata:', err);
    showAlert(err.message || 'Silinirken hata oluştu', 'error');
  }
}

document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const data = getFormData();
  if (!data.ad_soyad || !data.email || !data.cinsiyet) {
    showAlert('Tüm alanları doldurun.', 'error');
    return;
  }
  console.debug('[SUBMIT_USER] Başlıyor, id:', id || '(yeni)', 'data:', data);
  const btn = document.getElementById('submit-btn');
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Kaydediliyor...';
  try {
    const url = id ? `${API}/${id}` : API;
    const method = id ? 'PUT' : 'POST';
    console.debug('[SUBMIT_USER] Fetch', method, url);
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(result.error || 'İşlem başarısız');
    showAlert(id ? 'Kullanıcı güncellendi.' : 'Kullanıcı eklendi.', 'success');
    resetForm();
    loadUsers();
  } catch (err) {
    console.error('[SUBMIT_USER] Hata:', err);
    showAlert(err.message || 'Kayıt sırasında hata oluştu', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = origText;
  }
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  resetForm();
});

loadUsers();
window.addEventListener('lang-change', () => loadUsers());
