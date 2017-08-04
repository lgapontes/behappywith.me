import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <NovoUsuario />
            </div>
        );
    }
}

export default App;