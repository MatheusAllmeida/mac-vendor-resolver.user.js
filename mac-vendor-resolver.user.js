// ==UserScript==
// @name         MAC Vendor Resolver
// @namespace    https://github.com/seuusuario
// @version      1.0
// @description  Adiciona o nome do fabricante ao lado de endereços MAC em páginas web que contenham tabelas ou listas com MACs. Compatível com páginas dinâmicas (Angular, etc). Usa a API pública do maclookup.app.
// @author       Allmeida
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @connect      api.maclookup.app
// ==/UserScript==

(function () {
    'use strict';

    const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua pela sua chave do maclookup.app
    const macRegex = /\b([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2})\b/;
    const cache = new Map();

    function formatMAC(mac) {
        return mac.replace(/[:-]/g, '').toUpperCase().match(/.{1,2}/g).join(':');
    }

    function buscarVendor(mac, tdEl) {
        if (cache.has(mac)) {
            mostrarFabricante(tdEl, cache.get(mac));
            return;
        }

        GM_xmlhttpRequest({
            method: "GET",
            url: `https://api.maclookup.app/v2/macs/${mac}`,
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            },
            onload: function (response) {
                try {
                    const data = JSON.parse(response.responseText);
                    const fabricante = data.company || "Fabricante desconhecido";
                    cache.set(mac, fabricante);
                    mostrarFabricante(tdEl, fabricante);
                } catch (e) {
                    console.error("Erro ao consultar MAC:", e);
                }
            }
        });
    }

    function mostrarFabricante(td, nome) {
        if (td.querySelector('.mac-vendor-info')) return;

        const span = document.createElement('span');
        span.className = 'mac-vendor-info';
        span.textContent = ` → ${nome}`;
        span.style.color = 'purple';
        span.style.fontWeight = 'bold';
        span.style.marginLeft = '10px';
        td.appendChild(span);
    }

    function processarMACs() {
        const tds = document.querySelectorAll('td');

        for (let i = 0; i < tds.length - 1; i++) {
            const label = tds[i].textContent.trim().toLowerCase();
            if (label.includes('mac')) {
                const valorTd = tds[i + 1];
                if (valorTd && !valorTd.querySelector('.mac-vendor-info')) {
                    const texto = valorTd.textContent.trim();
                    const match = texto.match(macRegex);
                    if (match) {
                        const mac = formatMAC(match[0]);
                        buscarVendor(mac, valorTd);
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(() => {
        processarMACs();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(processarMACs, 1000);
    });
})();
