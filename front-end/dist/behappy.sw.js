var identificador = 'behappy.sw';
var versao = 1;
var idAtual = identificador + '-' + versao;
var idAnterior = identificador + '-' + (versao - 1);

var urls = [    
    '/',
    //'behappy.sw.js',
    'bundle.js',
    'style.css',
    'img/avatars.png',
    'img/botoes.png',
    'img/favicon.ico',
    'img/logo.png',
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

// XXXXXXXXX
function precisoBuscar(url) {
    /*
    if (url.indexOf(identificador) > -1)
    caches.has(idAtual).then(existe => callback(existe))
    */

    
    if (!navigator.onLine) {        
        var precisa = url.indexOf(identificador) > -1 ? false : true;
        console.log('Precisa? ' + precisa + " " + url)
        return precisa;
    }
    return true;
}

function precisoBuscar2(url,callback) {
    console.log(url);
    console.log(url.indexOf(identificador) > -1);
    if (url.indexOf(identificador) > -1) {
        caches.has(idAtual).then(existe => callback(existe))
    } else {
        callback(true)
    }
}
// XXXXXXXXX

function buscarArquivos(event) {    
    let request = event.request;
    let promise = caches.match(request).then(arquivo => {
        return arquivo ? arquivo : fetch(pedido)
    })
    event.respondWith(promise)

    /*
    event.respondWith(
        caches.match(request).then(function(arquivoCache) {
            if (arquivoCache) {
                return arquivoCache
            } else {
                return fetch(request);
            }
        })
    )
    */
}

self.addEventListener("install", instalarServiceWorker);
self.addEventListener("activate", ativarServiceWorker);
self.addEventListener("fetch", buscarArquivos);