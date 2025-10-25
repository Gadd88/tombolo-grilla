import { transformarNumero } from "../config/utils";
import type { NumeroType } from "./GrillaNumeros";

type CeldaNumeroProps = {
  data: NumeroType;
  onSelect: (num: NumeroType) => void;
};

export const CeldaNumero = ({ data, onSelect }: CeldaNumeroProps) => {
  const getColor = () => {
    if (data.estado === "reservado") return "bg-yellow-400 hover:bg-green-500 cursor-not-allowed";
    if (data.estado === "vendido") return "bg-red-500 text-white cursor-not-allowed";
    return "bg-green-400 hover:bg-green-500 cursor-pointer";
  };

  return (
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold ${getColor()} transition-all`}
      onClick={() => data.estado === "disponible" && onSelect(data)}
    >
      {transformarNumero(data.id)}
    </div>
  );
}
