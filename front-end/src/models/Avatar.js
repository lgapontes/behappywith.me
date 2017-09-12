class Avatar {
    constructor(index,descricao) {
        this.index = index;
        this.descricao = descricao;
    }
    toString() {
        return this.descricao;
    }
    static obterTodos() {
        return Array(23).fill(0).map((entry,i) => {
            return new Avatar(i,`Avatar ${i+1}`)
        })
    }
}

export default Avatar;