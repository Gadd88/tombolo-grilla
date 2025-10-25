import type { NumeroType } from "../componentes";

export const transformarNumero = (numero: NumeroType["id"]) => {
    if (numero < 10) return `0${numero}`;
    return numero;
};
export const transformarNombre = (numero: NumeroType) => {
    if (!numero.nombre) return "-";
    return `${numero.nombre} ${numero.apellido}`;
};
