var identificador = 'behappy.sw';
var versao = 2;
var idAtual = identificador + '-' + versao;
var idAnterior = identificador + '-' + (versao - 1);

var urls = [    
    '/',
    'bundle.js',
    'style.css',
    'img/avatars.png',
    'img/botoes.png',
    'img/favicon.ico',
    'img/logo.png',
    'img/icon-72x72.png',
    'img/icon-96x96.png',
    'img/icon-128x128.png',
    'img/icon-144x144.png',
    'img/icon-152x152.png',
    'img/icon-192x192.png',
    'img/icon-384x384.png',
    'img/icon-512x512.png'
];

function instalarServiceWorker() {
    console.log('ServiceWorker instalado com sucesso!');
}

function ativarServiceWorker() {
    caches.open(idAtual).then(cache => {
        console.log('Cache Storage ' + idAtual + ' foi ativado com sucesso!');

        cache.addAll(urls)
            .then(function(){
                caches.delete(idAnterior)
                console.log('Cache Storage ' + idAnterior + ' foi excluído!');
            })
    })
}

function buscarArquivos(event) {    
    event.respondWith(
        caches.match(event.request).then(function(arquivoCache) {            
            return arquivoCache ? arquivoCache : fetch(event.request);
        })
    )
}

function buscarArquivosComSalvamento(event) {
    event.respondWith(
        caches.match(event.request).then(function(arquivoCache) {        
            if (arquivoCache) {
                return arquivoCache;
            }

            var cloneDoRequest = event.request.clone();
            return fetch(cloneDoRequest).then(function(response) {                
                var cloneDoResponse = response.clone();
                caches.open(idAtual).then(function(cache) {
                    cache.put(event.request, cloneDoResponse);
                });
                return response;
            });
        })
    );
}

self.addEventListener("install", instalarServiceWorker);
self.addEventListener("activate", ativarServiceWorker);
self.addEventListener("fetch", buscarArquivos);