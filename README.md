# Berry Web Player

Biblioteca de player web publicada separadamente para reutilização externa e reorganizada em arquivos menores.

## O que este pacote entrega

- `dist/player.css`: estilos completos do player.
- `dist/cast.js`: bootstrap isolado do Google Cast.
- `dist/player.js`: módulo principal do player.
- `dist/watch.js`: bootstrap que injeta o template HTML e inicializa o módulo.
- `dist/templates/player-shell.html`: estrutura HTML do player.
- `examples/watch.html`: exemplo mínimo de integração.

## Fluxo de uso

1. Sirva a pasta `dist/`.
2. Crie um shell HTML com um `#watchApp`.
3. Aponte `data-asset-base` e `data-template-url`.
4. Carregue `cast.js`, `hls.js` e `watch.js`.
5. Exponha o backend com o contrato de `/api/watch/:seasonToken/:episodeToken`.

## Shell mínimo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Berry Web Player</title>
  <link rel="stylesheet" href="../dist/player.css">
  <script src="../dist/cast.js"></script>
</head>
<body>
  <div
    id="watchApp"
    data-asset-base="../dist"
    data-template-url="../dist/templates/player-shell.html"
    data-storage-namespace="player-public"
    data-stream-provider-header="x-player-provider"
    data-stream-provider-value="public-player"
    data-stream-context-header="x-player-context"
    data-download-prefix="player-public"
  >
    <div class="watch-loading">Montando player...</div>
  </div>

  <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" async></script>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js"></script>
  <script type="module" src="../dist/watch.js"></script>
</body>
</html>
```

## Dependências de runtime

- `hls.js` para HLS.
- `cast_sender.js` para Google Cast.
- `subtitles-octopus.js` é opcional. Sem ele o player continua funcionando, mas perde o renderizador ASS avançado.
- Os ícones dos controles ficam inline no template, então não existe sprite SVG obrigatório no runtime.
- O pacote público não inclui o provedor de vídeos nem o backend privado da aplicação consumidora.

## Configuração por `data-*`

- `data-asset-base`: prefixo público dos assets do player.
- `data-template-url`: caminho para o HTML do shell.
- `data-storage-namespace`: namespace para `sessionStorage` e preferências locais.
- `data-stream-provider-header`: header enviado em fetches protegidos.
- `data-stream-provider-value`: valor padrão do header do provedor.
- `data-stream-context-header`: header para contexto/token de stream.
- `data-download-prefix`: prefixo usado em screenshots e clipes exportados.

## Documentação

- `docs/ARCHITECTURE.md`
- `docs/INTEGRATION.md`
- `docs/SECURITY.md`

## Exportação a partir do projeto principal

No projeto privado que consome esta biblioteca, rode:

```bash
node scripts/export-berry-web-player.mjs /caminho/do/clone/berry-web-player
```

Esse comando copia os assets públicos, a documentação e o exemplo para o repositório aberto.
