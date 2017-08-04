class Exemplo extends React.Component {
    constructor(props) {
        super(props);
        this.valor = true;
    }
    render() {

let p = null;
if (this.valor) {
    p = <p>Condição verdadeira</p>;
} else {
    p = <p>Condição falsa</p>;
}
return p;

    }
}