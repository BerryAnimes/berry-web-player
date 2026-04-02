# Security

## Revisão feita antes da publicação

- Remoção do monólito inline em `watch.html`.
- Extração dos SVGs de controle para `icons.svg`.
- Defaults do pacote tornados genéricos.
- Branding e headers internos movidos para configuração do shell privado.
- Nenhum `.env`, segredo, token real, IP do VPS ou caminho do backend foi incluído em `dist/`.

## O que não vai para o repositório público

- `server.js`
- bancos SQLite
- credenciais
- tokens de sessão
- rotas internas fora do contrato do player
- backups do projeto

## Riscos ainda existentes

- O player continua dependendo do backend para autorização real do conteúdo.
- `cast_sender.js` e `hls.js` são carregados de terceiros; mantenha versões fixadas e, se possível, SRI.
- `subtitles-octopus.js` permanece opcional e deve ser servido por você quando quiser ASS avançado.
- O endpoint de clipagem exige proteção forte no servidor, porque ele dispara `ffmpeg`.

## Checklist antes de subir uma nova versão

1. Rode o exportador público.
2. Verifique se `dist/` não contém branding interno por padrão.
3. Busque por `x-berry`, `berryanimes`, IPs e segredos no pacote exportado.
4. Valide imports ESM e carregamento do template.
5. Confirme que `comments` e `clip` continuam protegidos no backend.
