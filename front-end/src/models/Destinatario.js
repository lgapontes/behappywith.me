class Destinatario {
    constructor(index,descricao) {
        this.index = index;
        this.descricao = descricao;
    }
    toString() {
        return this.descricao;
    }
    static obterTodos() {
        let destinatarios = [
            new Destinatario(0,"Pais"),
            new Destinatario(1,"Filhos"),
            new Destinatario(2,"Cônjuges"),
            new Destinatario(3,"Amigos"),
            new Destinatario(4,"Pets"),
            new Destinatario(5,"Outros")
        ];
        return destinatarios;
    }
    static obterTodasPessoas() {
        let todos = Destinatario.obterTodos();      
        let pessoas = [
            todos[0], // Pais
            todos[1], // Filhos
            todos[2], // Cônjuges
            todos[3], // Amigos
            todos[5]  // Outros
        ];
        return pessoas;
    }
}

export default Destinatario;