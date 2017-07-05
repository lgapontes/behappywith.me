import React from 'react'
import ReactDOM from 'react-dom'
 
class Exemplo extends React.Component {
   constructor(props) {
       super(props);       
       this.state = {
           color: 'red',
           count: 0
       };
   }
   changeValue(e) {
       let count = this.state.count;
       let color = ( ++count % 2 ) == 0 ? 'red' : 'blue';
       this.setState({
           color: color,
           count: count
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
                   {this.props.text}               
               </h1>
               <button onClick={this.changeValue.bind(this)}>Clique aqui!</button>
           </div>
       )
   }
}
 
ReactDOM.render(
   <Exemplo text="Olá Mundo!" />,
   document.querySelector("#main")
)