import Avatar from './Avatar';
import Gentileza from './Gentileza';
import Repository from '../infrastructure/Repository';

const repository = new Repository();

class Usuario {
    constructor() {        
        this.nome = ''
        this.genero = ''
        this.avatar = Avatar.obterTodos()[0],
        this.gentilezas = []
    }

    validarNome() {
        if (
            typeof this.nome === 'string' &&
            this.nome.length != 0 &&
            this.nome.length <= 40) {
            return true;
        }
        return false;
    }
    validarGenero() {
        return ['m','f'].some(param => {
            return this.genero === param
        })
    }
    toString() {
        return `${this.nome}, ${this.avatar.toString()}, com ${this.gentilezas.length} gentileza(s)`
    }

    salvar(callback) {        
        repository.salvar(this,callback);
    }
    static obter(sucesso,falha) {
        repository.obter(json => {
            let usuario = new Usuario();
            usuario.nome = json.nome;
            usuario.genero = json.genero;
            usuario.avatar = new Avatar(
                json.avatar.index,
                json.avatar.descricao
            );
            let count = 0;
            if (json.gentilezas.length == 0) {
                sucesso(usuario);
            } else {
                json.gentilezas.forEach(entry => {                    
                    let gentileza = Gentileza.parse(entry);
                    usuario.gentilezas.push(gentileza);
                    count = count + 1;
                    if (count == json.gentilezas.length) {
                        sucesso(usuario);
                    }
                });
            }            
        },falha);
    }
    adicionarGentileza(gentileza,callback) {
        this.gentilezas.unshift(gentileza);
        repository.salvar(this,callback);
    }
    excluirGentileza(uid,callback) {
        this.gentilezas.filter(gentileza =>
            gentileza.uid === uid
        )[0].excluir();
        repository.salvar(this,callback);
    }
    executarGentileza(uid,callback) {
        this.gentilezas.filter(gentileza =>
            gentileza.uid === uid
        )[0].executar();
        repository.salvar(this,callback);
    }
}

export default Usuario;