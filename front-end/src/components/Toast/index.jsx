import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Toast extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            tipo: props.erro ? 'error' : (
                props.sucesso ? 'success' : 'info'
            )
        }
    }

    exibir(msg) {
        toast[this.state.tipo](msg)
    }

    render() {
        return (
            <ToastContainer 
                position="bottom-center"
                type={this.state.tipo}
                autoClose={5000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
            />
        );
    }
}

export default Toast;