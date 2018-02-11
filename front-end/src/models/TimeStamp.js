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

/**** Funções para apoio ****/
/*
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

function eDataValida(data) {
    if ( Object.prototype.toString.call(data) === "[object Date]" ) {
        if ( isNaN( data.getTime() ) ) {
            return false;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}
*/

class TimeStamp {
    constructor(data) {
        if (data) {
            this.valor = data;
        } else {
            this.valor = new Date();
        }
    }
    toDate() {
        return this.valor;
    }
    toString() {
        return formatarData(this.valor);
    }
    static diferenca(dataMaisAntiga,dataMaisRecente) {
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
    static diferencaDescritiva(dataMaisAntiga,dataMaisRecente) {
        let diff = TimeStamp.diferenca(dataMaisAntiga,dataMaisRecente);
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
    static adicionarSeisHoras(timestamp) {
        let data = new Date(timestamp.getTime() + 60 * 60 * 6.01 * 1000);
        return new TimeStamp(data);
    }
}

export default TimeStamp;