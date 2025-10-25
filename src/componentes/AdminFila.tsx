import { transformarNombre, transformarNumero } from "../config/utils";
import type { NumeroType } from "./GrillaNumeros";

type AdminFilaProps = {
    num: NumeroType;
    onChangeStatus: (
        id: NumeroType["id"],
        nuevoEstado: NumeroType["estado"]
    ) => void;
    cargarNumeros: () => void;
};
export const AdminFila = ({
    num,
    onChangeStatus,
    cargarNumeros,
}: AdminFilaProps) => {
    const color =
        num.estado === "vendido"
            ? "text-red-600 font-semibold bg-red-100 rounded-lg px-1 text-center"
            : num.estado === "reservado"
            ? "text-yellow-600 font-semibold bg-yellow-100 rounded-lg px-1 text-center"
            : "text-green-600 font-semibold bg-green-100 rounded-lg px-1 text-center";

    return (
        <tr className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-2 text-lg font-semibold">
                {transformarNumero(num.id)}
            </td>
            <td className="px-4 py-2 text-sm font-medium">{transformarNombre(num)}</td>
            <td className="px-4 py-2 text-sm">{num.telefono}</td>
            <td className={`p-2 ${color}`}>{num.estado.toUpperCase()}</td>
            <td className="p-2 flex gap-2 justify-center">
                {num.estado === "reservado" && (
                    <button
                        onClick={() => onChangeStatus(num.id, "vendido")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                        Marcar vendido
                    </button>
                )}
                {num.estado !== "disponible" && (
                    <button
                        onClick={() => {
                            onChangeStatus(num.id, "disponible");
                            cargarNumeros();
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                    >
                        Liberar
                    </button>
                )}
            </td>
        </tr>
    );
};
