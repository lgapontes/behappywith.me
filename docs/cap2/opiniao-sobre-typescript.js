function salvarNoMongo(usuario) {}

function salvar(usuario) {
    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    if (typeof usuario.login !== 'string' || 
        usuario.login.length < 3) {
        throw new Error('Login inválido!');
    }

    if (typeof usuario.idade !== 'string' || 
        parseInt(usuario.idade) < 0) {
        throw new Error('Idade inválida!');
    }

    salvarNoMongo(usuario);
};

let usuario = {
    "login": "fulano",
    "nome": "Fulano",
    "sobrenome": "Ciclano",
    "endereco": "Rua 123",
    "idade": "20"
};

salvar(usuario);