# MAC Vendor Resolver – UserScript

Este script Tampermonkey detecta endereços MAC em páginas da web e exibe automaticamente o nome do fabricante ao lado de cada MAC, utilizando a API do [maclookup.app](https://maclookup.app).

## Funcionalidades

- Detecta MACs em tabelas e listas.
- Mostra o fabricante (ex: `→ MikroTik`, `→ Cisco`).
- Compatível com páginas dinâmicas (Angular, SPA, etc).
- Evita requisições repetidas com cache local.

## Pré-requisitos

- Navegador com a extensão [Tampermonkey](https://www.tampermonkey.net/) instalada.
- Conta gratuita no [maclookup.app](https://maclookup.app/) para gerar sua API key.

## Como usar

1. Gere sua API key no [https://maclookup.app](https://maclookup.app).
2. Substitua `SUA_API_KEY_AQUI` no script pela sua chave.
3. Instale o script via Tampermonkey.
4. Acesse qualquer página com MACs e veja os fabricantes ao lado dos endereços.

## Licença

[MIT](LICENSE)
