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

    return new 
}

class TimeStamp {
    constructor() {
        this.valor = formatarData(new Date());
    }    
}

export default TimeStamp;