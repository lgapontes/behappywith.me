class ManipularEvento {
    constructor(minLeft,maxLeft,comprimentoItem,index,minIndex,maxIndex) {
        this.minLeft = minLeft;
        this.maxLeft = maxLeft;
        this.comprimentoItem = comprimentoItem;
        this.index = index;
        this.minIndex = minIndex;
        this.maxIndex = maxIndex;
        this.direcao = 0;

        this.left = maxLeft;
        this.deslocamento = 0;
        //this.ultimaMarcacao = 0;
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
        //this.ultimaMarcacao = Date.now();
        this.toqueInicial = x;
        this.toqueEmExecucao = true;
    }
        
    mover(x) {
        if (this.toqueEmExecucao) {
            const toqueX = x;
            //const marcacao = Date.now();
            //const elapsed = marcacao - this.ultimaMarcacao;            
            this.swipe(toqueX);            
            this.flinging(toqueX);
            this.calcularDirecao(toqueX);            
            //this.ultimaMarcacao = marcacao;
            this.toqueAnterior = toqueX;            
        }
    }
        
    atualizar() {        
        this.toqueInicial = 0;
        this.toqueEmExecucao = false;
        this.corrigirIndex();    
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

        let diff = toqueX - this.toqueAnterior;
        let size = Math.abs(diff);
        
        let bonus = 0;
        if (size < this.comprimentoItem) {
            
            if (diff < 0) {
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