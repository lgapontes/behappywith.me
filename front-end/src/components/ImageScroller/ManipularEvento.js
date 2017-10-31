class ManipularEvento {
    constructor(qtdeElementos,index) {        
        this.maxIndex = qtdeElementos;
        this.index = index;
        
        this.comprimentoItem = 140;
        this.maxLeft = 86;
        this.left = this.maxLeft;

        this.minLeft = (
            (qtdeElementos - 1) *
            this.comprimentoItem * (-1)
        ) + this.maxLeft;
        
        this.minIndex = 0;
        this.direcao = 0;        
        this.deslocamento = 0;        
        this.toqueInicial = 0;
        this.toqueAnterior = 0;
        this.toqueEmExecucao = false;
    }

    definirIndex(index) {        
        if ((index >= this.minIndex) && (index < this.maxIndex)) {
            this.index = index;
        }                
    }
    
    iniciar(x) {
        this.deslocamento = this.left;        
        this.toqueInicial = x;
        this.toqueEmExecucao = true;
    }
        
    mover(toqueX) {        
        if (this.toqueEmExecucao) {            
            this.swipe(toqueX);
            this.flinging(toqueX);
            this.calcularDirecao(toqueX);
            this.toqueAnterior = toqueX;
        }
    }

    atualizarClique() {
        this.atualizar(false)
    }
    atualizarToque() {
        this.atualizar(true)
    }

    atualizar(toque) {
        this.toqueInicial = 0;
        this.toqueEmExecucao = false;
        if (toque) this.corrigirIndex();
        this.left = (this.index * this.comprimentoItem * (-1)) + this.maxLeft;
    }

    swipe(toqueX) {        
        let deltaX = toqueX - this.toqueInicial + this.deslocamento;
        if (deltaX < this.minLeft) {
            deltaX = this.minLeft;
        } else if (deltaX > this.maxLeft) {
            deltaX = this.maxLeft;
        } 

        this.left = deltaX;
    }

    flinging(toqueX) {        
        let index = Math.round(
            Math.abs(
                (this.left - this.maxLeft) / this.comprimentoItem
            )
        );

        let diferenca = toqueX - this.toqueAnterior;
        let extensaoToque = Math.abs(diferenca);
        
        let bonus = 0;
        if (extensaoToque < this.comprimentoItem) {
            
            if (diferenca < 0) {
                bonus = 1;
            } else {
                bonus = -1;
            }            
        }
        this.definirIndex( index + bonus );
    }

    calcularDirecao(toqueX) {
        if (toqueX > this.toqueAnterior) {
            this.direcao = 1;
        } else if (toqueX < this.toqueAnterior) {
            this.direcao = -1;
        } else {
            this.direcao = 0;
        }
    }

    corrigirIndex() {
        if (
            this.index == 1 && 
            this.direcao == 1 && 
            this.left == this.maxLeft
        ) {
            this.index = 0;
        }

        if (
            this.index == (this.maxIndex - 2) &&
            this.direcao == -1 &&
            Math.sign(this.left) == -1)
        {
            this.index = (this.maxIndex - 1);
        }
    }
}

export default ManipularEvento;