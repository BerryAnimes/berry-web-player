window.__CAST_READY = window.__CAST_READY || false;
window.__AW_GCAST_AVAILABLE = (typeof window.__AW_GCAST_AVAILABLE === 'undefined') ? null : window.__AW_GCAST_AVAILABLE;
window.__AW_CAST_INITED = window.__AW_CAST_INITED || false;

window.__AW_INIT_CAST = function () {
  if (window.__AW_CAST_INITED) return;
  if (window.__AW_GCAST_AVAILABLE !== true) return;

  if (typeof cast === 'undefined' || typeof chrome === 'undefined' || !cast.framework || !cast.framework.CastContext) {
    return;
  }

  try {
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      language: 'pt-BR',
      resumeSavedSession: true
    });

    window.__CAST_READY = true;
    window.__AW_CAST_INITED = true;
    window.dispatchEvent(new CustomEvent('cast-ready'));
  } catch (_) {}
};

window.__onGCastApiAvailable = function (isAvailable) {
  window.__AW_GCAST_AVAILABLE = !!isAvailable;
  if (!isAvailable) return;
  window.__AW_INIT_CAST();
  setTimeout(window.__AW_INIT_CAST, 0);
  setTimeout(window.__AW_INIT_CAST, 250);
};
