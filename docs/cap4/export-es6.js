// Arquivo componente.js
export var valorA = 'Valor de A';
export function funcaoB() {
    return 'Função B';
};
export default function funcaoPrincipal() {
    return 'Função Principal';
};

// Arquivo main.js
import funcaoPrincipal, { valorA, funcaoB } from "componente"

// Arquivo outro.js - outro exemplo
import funcaoPrincipal from "componente"