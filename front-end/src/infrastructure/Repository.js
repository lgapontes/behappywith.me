class Repository {    
    constructor() {
        this.key = 'behappy-user';
    }
    salvar(json,callback) {
        let data = JSON.stringify(json);
        window.localStorage.setItem(this.key,data);
        callback();
    }
    obter(sucesso,falha) {        
        let data = window.localStorage.getItem(this.key);        
        let json = JSON.parse(data);
        if (json)
            sucesso(json);
        else
            falha();
    }
}

export default Repository;