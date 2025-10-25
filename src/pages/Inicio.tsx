import { GrillaNumeros } from "../componentes/GrillaNumeros";

export const Inicio = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-5 p-2">
            <h1 className="text-3xl font-bold mt-5">Seleccioná tu número</h1>
            <GrillaNumeros />
        </div>
    );
};
