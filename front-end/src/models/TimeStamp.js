function pad(num, size) {    
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function formatarData(date) {  
    let dia = pad(date.getDate(),2);
    let mes = pad(date.getMonth()+1,2);
    let ano = date.getFullYear();
    let hora = pad(date.getHours(),2);
    let minuto = pad(date.getMinutes(),2);
    let segundo = pad(date.getSeconds(),2);
    let mili = pad(date.getMilliseconds(),3);

    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}.${mili}`;
}

function obterData(str) {
    // 012345678901234567890123
    // 09/02/2018 22:04:12.196
    let dia = str.substring(0, 2);
    let mes = str.substring(3, 5);
    let ano = str.substring(6, 10);
    let hora = str.substring(11, 13);
    let minuto = str.substring(14, 16);
    let segundo = str.substring(17, 19);
    let mili = str.substring(20, 23);

    return new Date(ano, mes-1, dia, hora, minuto, segundo, mili);
}

function diferenca(dataMaisAntiga,dataMaisRecente) {
    let ms = dataMaisRecente - dataMaisAntiga;
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    
    return {
        dias: d,
        horas: h,
        minutos: m,
        segundos: s
    };
}

class TimeStamp {
    constructor(data) {
        if (typeof data === 'string') {
            this.valor = data;
        } else {
            this.valor = formatarData(new Date());
        }        
    }
    toDate() {
        return obterData(this.valor);
    }
    toString() {
        return this.valor;
    }
    diferenca(data) {
        return diferenca(this.toDate(),data ? data : Date.now());
    }
    diferencaDescritiva() {
        let diff = this.diferenca();
        // {dias: 1, horas: 2, minutos: 0, segundos: 26}
        if (diff.dias == 1) {
            return '1 dia'
        } else if (diff.dias > 1) {
            return `${diff.dias} dias`
        } else if (diff.horas == 1) {
            return '1 hora'
        } else if (diff.horas > 1) {
            return `${diff.horas} horas`
        } else if (diff.minutos == 1) {
            return '1 minuto'
        } else if (diff.minutos > 1) {
            return `${diff.minutos} minutos`
        } else {
            return 'menos de 1 minuto'
        }
    }
    static adicionarUmDia(timestamp) {
        let data = new Date(timestamp.toDate().getTime() + 60 * 60 * 24 * 1000);
        return new TimeStamp(formatarData(data));
    }
}

export default TimeStamp;