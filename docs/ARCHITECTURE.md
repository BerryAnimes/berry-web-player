# Architecture

## Split realizado

- `views/watch.html`: virou um shell fino.
- `public/berry-web-player/templates/watch-player-shell.html`: HTML estrutural.
- `public/berry-web-player/berry-player.css`: CSS completo.
- `public/berry-web-player/berry-player.js`: lógica principal do player.
- `public/berry-web-player/watch-page.js`: bootstrap de montagem.
- `public/berry-web-player/cast-bootstrap.js`: init antecipado do Cast.
- `public/berry-web-player/icons.svg`: sprite externo de ícones.

## Ciclo de inicialização

1. O shell HTML carrega CSS, `cast-bootstrap.js`, `hls.js` e `watch-page.js`.
2. `watch-page.js` busca `templates/watch-player-shell.html`.
3. O template é injetado no `#watchApp`.
4. Os placeholders `__BERRY_PLAYER_ASSET_BASE__` viram URLs reais do sprite.
5. `bootstrapBerryWatchPage()` monta listeners, estado e fetch inicial.
6. O player pede `/api/watch/:seasonToken/:episodeToken` e faz o attach do stream.

## Responsabilidades dos módulos

### `cast-bootstrap.js`

- Define `window.__onGCastApiAvailable`.
- Inicializa `CastContext` sem inline script no HTML.

### `watch-page.js`

- Lê o shell do DOM.
- Resolve `data-*`.
- Busca o template HTML.
- Chama o bootstrap do player.

### `berry-player.js`

- Mantém o estado do player.
- Controla HLS, legendas, toasts, settings, comentários, clipes, endcard e progress.
- Expõe `bootstrapBerryWatchPage(options)`.

## Assets

- O sprite `icons.svg` substitui os SVGs inline dos controles.
- O spinner de buffering permaneceu inline por depender de classes animadas específicas.

## Padrão de configuração

O módulo principal ficou com defaults genéricos:

- `storageNamespace = berry-web-player`
- `streamProviderHeader = x-player-provider`
- `streamProviderValue = berry-web-player`
- `streamContextHeader = x-player-context`
- `downloadPrefix = berry-web-player`

Qualquer host privado pode sobrescrever isso via `data-*`.
