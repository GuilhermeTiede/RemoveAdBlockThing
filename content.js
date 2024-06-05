// ==UserScript==
// @name            
// @version      1.1
// @description  Removes Adblock Thing
// @author       Guilherme Tiede
// @match        https://www.youtube.com/*
// @updateURL    https://github.com/GuilhermeTiede/RemoveAdBlockThing
// @downloadURL  https://github.com/GuilhermeTiede/RemoveAdBlockThing
// @grant        none
// ==/UserScript==

(function() {
    const removerAdblockOverlay = () => {
        const adblockOverlay = document.querySelector('.adblock-overlay');
        if (adblockOverlay) {
            adblockOverlay.remove();
            console.log('Adblock overlay removido');
        } else {
            console.log('Nenhum adblock overlay encontrado');
        }
    };

    const prevenirDuplicacaoAudio = () => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
            console.log('Áudio duplicado prevenido');
        }
    };

    const main = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo para garantir que a página foi carregada
        removerAdblockOverlay();
        prevenirDuplicacaoAudio();
    };

    document.addEventListener('DOMContentLoaded', () => {
        try {
            main();
        } catch (error) {
            console.error('Erro ao executar script:', error);
        }
    });
})();
