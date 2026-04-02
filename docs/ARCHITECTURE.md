# Architecture

## Split realizado

- `views/watch.html`: virou um shell fino.
- `public/berry-web-player/templates/player-shell.html`: HTML estrutural.
- `public/berry-web-player/player.css`: CSS completo.
- `public/berry-web-player/player.js`: lógica principal do player.
- `public/berry-web-player/watch.js`: bootstrap de montagem.
- `public/berry-web-player/cast.js`: init antecipado do Cast.

## Ciclo de inicialização

1. O shell HTML carrega CSS, `cast.js`, `hls.js` e `watch.js`.
2. `watch.js` busca `templates/player-shell.html`.
3. O template é injetado no `#watchApp`.
4. Os placeholders `__BERRY_PLAYER_ASSET_BASE__` viram URLs reais dos assets opcionais.
5. `bootstrapBerryWatchPage()` monta listeners, estado e fetch inicial.
6. O player pede `/api/watch/:seasonToken/:episodeToken` e faz o attach do stream.

## Responsabilidades dos módulos

### `cast.js`

- Define `window.__onGCastApiAvailable`.
- Inicializa `CastContext` sem inline script no HTML.

### `watch.js`

- Lê o shell do DOM.
- Resolve `data-*`.
- Busca o template HTML.
- Chama o bootstrap do player.

### `player.js`

- Mantém o estado do player.
- Controla HLS, legendas, toasts, settings, comentários, clipes, endcard e progress.
- Expõe `bootstrapBerryWatchPage(options)`.

## Assets

- Os controles usam SVG inline no próprio template.
- O spinner de buffering permanece inline por depender de classes animadas específicas.

## Padrão de configuração

O módulo principal ficou com defaults públicos genéricos:

- `storageNamespace = player-public`
- `streamProviderHeader = x-player-provider`
- `streamProviderValue = public-player`
- `streamContextHeader = x-player-context`
- `downloadPrefix = player-public`

Qualquer aplicação consumidora pode sobrescrever isso via `data-*`.
