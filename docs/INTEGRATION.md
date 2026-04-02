# Integration

## Rotas mínimas esperadas

### `GET /api/watch/:seasonToken/:episodeToken`

Retorna os dados usados por `loadWatchData()`:

```json
{
  "anime": {
    "id": 1,
    "slug": "anime-slug",
    "nome": "Nome do anime",
    "imagem_capa": "https://...",
    "titulo_imagem": "https://..."
  },
  "episode": {
    "id": 10,
    "numero": 1,
    "temporada": 1,
    "episode_title": "Título do episódio"
  },
  "season": {
    "number": 1,
    "episodios": []
  },
  "player": {
    "streamUrl": "https://...",
    "mimeType": "application/vnd.apple.mpegurl",
    "provider": "videoapi",
    "streamProviderHeader": "x-player-provider",
    "streamProviderValue": "berry-web-player",
    "streamContextHeader": "x-player-context",
    "streamContextToken": "opaque-token",
    "externalEmbed": false,
    "externalEmbedUrl": null
  },
  "preferences": {
    "audioLang": "sub",
    "subtitleLang": "pt-BR",
    "preferDub": false,
    "autoSkipIntro": false,
    "autoplay": false
  },
  "progress": {
    "resumeSeconds": 0,
    "duration": 1440
  },
  "navigation": {
    "prev": null,
    "next": null
  },
  "skip": {},
  "comments": {
    "count": 0,
    "canComment": true
  },
  "permissions": {
    "canClip": false,
    "clipMaxDurationMs": 300000
  },
  "endcard": {
    "rating": {
      "currentUserRating": null,
      "counts": {
        "odiei": 0,
        "gostei": 0,
        "amei": 0
      },
      "total": 0
    },
    "recommendations": []
  }
}
```

## Endpoints opcionais

### `GET /api/watch/:seasonToken/:episodeToken/comments`

- Carrega lista de comentários.
- Espera `{ count, items, viewer, canComment }`.

### `POST /api/watch/:seasonToken/:episodeToken/comments`

- Publica comentário do episódio.
- Espera `content` no body.

### `POST /api/watch/:seasonToken/:episodeToken/clip`

- Exporta clipe quando `permissions.canClip` for `true`.
- Espera `startMs`, `endMs`, `provider`, `audio`, `videoId`.

## Dependências do browser

- `window.Hls`: para manifests HLS.
- `window.cast`: opcional, só habilita o botão Cast.
- `window.SubtitlesOctopus`: opcional, ativa o renderizador ASS avançado.

## Integração privada

Arquivos em produção:

- `views/watch.html`
- `public/berry-web-player/player.css`
- `public/berry-web-player/player.js`
- `public/berry-web-player/watch.js`
- `public/berry-web-player/cast.js`
- `public/berry-web-player/templates/player-shell.html`

Em ambientes privados, o shell pode sobrescrever:

- `data-storage-namespace`
- `data-stream-provider-header`
- `data-stream-provider-value`
- `data-stream-context-header`
- `data-download-prefix`
