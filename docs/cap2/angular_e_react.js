// Atenção: este código não funciona
// Não há importação das bibliotecas do React e do Angular

// Exemplo React
let p = null;
if (this.valor) {
   p = <p>Condição verdadeira</p>;
} else {
   p = <p>Condição falsa</p>;
}

return p;

// Exemplo Angular

<!-- Exemplo Angular -->
<p *ngIf="valor">
    Condição verdadeira
</p>
<p *ngIf="!valor">
    Condição falsa
</p>