# Security

## Revisão feita antes da publicação

- Remoção do monólito inline no shell do player.
- Controles mantidos com SVG inline no template público.
- Defaults públicos mantidos genéricos.
- Detalhes específicos do ambiente consumidor ficaram fora do pacote público.
- Nenhum segredo, credencial, token real, IP ou caminho privado foi incluído em `dist/`.

## O que fica fora do pacote público

O repositório aberto deve conter apenas a biblioteca, a documentação e o exemplo de integração.
Artefatos do ambiente privado, credenciais, dados de infraestrutura, rotas administrativas e backups internos não fazem parte dessa publicação.

## Riscos ainda existentes

- O player continua dependendo do backend para autorização real do conteúdo.
- `cast_sender.js` e `hls.js` são carregados de terceiros; mantenha versões fixadas e, se possível, SRI.
- `subtitles-octopus.js` permanece opcional e deve ser servido por você quando quiser ASS avançado.
- O endpoint de clipagem exige proteção forte no servidor, porque ele dispara `ffmpeg`.

## Checklist antes de subir uma nova versão

1. Rode o exportador público.
2. Verifique se `dist/` só contém a biblioteca pública e os exemplos esperados.
3. Busque por nomes internos, credenciais e URLs privadas no pacote exportado.
4. Valide imports ESM e carregamento do template.
5. Confirme que `comments` e `clip` continuam protegidos no backend.
