// Exemplo 1
{
    const lista = [
        <li key="1">Item 1</li>,
        <li key="2">Item 2</li>,
        <li key="3">Item 3</li>
    ];
}

// Exemplo 2
{
    let lista = [];
    for (let i=0; i<3; i++) {
        lista.push(<li key={i+1}>Item {i+1}</li>);
    }
}

// Exemplo 3
{
    const lista = [0,1,2].map(
        entry => <li key={entry+1}>Item {entry+1}</li>
    )
}

// Exemplo 4
{
    const lista = [0,1,2].map(
        (entry,index) => <li key={index+1}>Item {index+1}</li>
    )
}