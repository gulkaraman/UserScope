// Basit toast yöneticisi (tüm sayfalarda ortak)
(() => {
  const containerId = 'toast-container';

  function ensureContainer() {
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement('div');
      el.id = containerId;
      el.className = 'toast-container';
      document.body.appendChild(el);
    }
    return el;
  }

  function show(message, type = 'info') {
    const container = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    console.debug('[TOAST]', type.toUpperCase(), message);

    container.appendChild(toast);

    // giriş animasyonu için zorla yeniden akış
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    toast.offsetHeight;
    toast.classList.add('toast-visible');

    const hideAfter = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => {
        if (toast.parentElement === container) {
          container.removeChild(toast);
        }
      }, 300);
    }, hideAfter);
  }

  window.showToast = show;
})();

