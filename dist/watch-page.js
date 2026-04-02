import { bootstrapBerryWatchPage } from './berry-player.js';

const DEFAULT_ASSET_BASE = '/berry-web-player';
const DEFAULT_TEMPLATE_PATH = `${DEFAULT_ASSET_BASE}/templates/watch-player-shell.html`;

function normalizeAssetBase(value) {
  const normalized = String(value || DEFAULT_ASSET_BASE).trim().replace(/\/+$/, '');
  return normalized || DEFAULT_ASSET_BASE;
}

function renderShellError(root, message) {
  root.innerHTML = `<div class="watch-error">${message}</div>`;
}

async function mountTemplate(root, { assetBase, templateUrl }) {
  const response = await fetch(templateUrl, {
    credentials: 'same-origin',
    cache: 'no-cache'
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar o template do player (${response.status}).`);
  }

  const template = await response.text();
  root.innerHTML = template.replaceAll('__BERRY_PLAYER_ASSET_BASE__', assetBase);
}

async function startWatchPage() {
  const root = document.getElementById('watchApp');
  if (!root) return;

  const assetBase = normalizeAssetBase(root.dataset.assetBase);
  const templateUrl = root.dataset.templateUrl || DEFAULT_TEMPLATE_PATH;
  const storageNamespace = root.dataset.storageNamespace || 'berry-web-player';
  const streamProviderHeader = root.dataset.streamProviderHeader || 'x-player-provider';
  const streamProviderValue = root.dataset.streamProviderValue || 'berry-web-player';
  const streamContextHeader = root.dataset.streamContextHeader || 'x-player-context';
  const downloadPrefix = root.dataset.downloadPrefix || 'berry-web-player';

  try {
    await mountTemplate(root, {
      assetBase,
      templateUrl
    });
    bootstrapBerryWatchPage({
      assetBase,
      storageNamespace,
      streamProviderHeader,
      streamProviderValue,
      streamContextHeader,
      downloadPrefix
    });
  } catch (error) {
    renderShellError(root, error?.message || 'Erro ao montar o player.');
    throw error;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      startWatchPage().catch(() => null);
    }, { once: true });
  } else {
    startWatchPage().catch(() => null);
  }
}
