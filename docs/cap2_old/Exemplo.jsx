import React from 'react'
import ReactDOM from 'react-dom'
 
class Exemplo extends React.Component {
   constructor(props) {
       super(props);       
       this.state = {
           cor: 'red',
           contador: 0
       };
   }
   trocarCor(e) {
       let contador = this.state.contador;
       let cor = ( ++contador % 2 ) == 0 ? 'red' : 'blue';
       this.setState({
           cor: cor,
           contador: contador
       });
   }
   render() {
       let style = {
           padding: 10,
           background: this.state.color
       }
       return (
           <div>
               <h1 style={style}>
                   {this.props.texto} {this.state.contador}
               </h1>
               <button onClick={this.trocarCor.bind(this)}>Clique aqui!</button>
           </div>
       )
   }
}
 
ReactDOM.render(
   <Exemplo texto="Olá Mundo!" />,
   document.querySelector("#main")
)