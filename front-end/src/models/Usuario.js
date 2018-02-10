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
            sucesso(usuario);
        },falha);
    }
    adicionarGentileza(gentileza,callback) {
        this.gentilezas.unshift(gentileza);
        repository.salvar(this,callback);
    }
}

export default Usuario;