import { doc, updateDoc } from "firebase/firestore";
import { useState, type FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { db } from "../config/firebase";
import type { NumeroType } from "./GrillaNumeros";
import { transformarNumero } from "../config/utils";

type ModalReservaProps = {
    numero: NumeroType
    onClose: () => void;
}

export const ModalReserva = ({ numero, onClose }: ModalReservaProps) => {
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        numero: numero,
    });

    const handleReserva = async () => {
        const docRef = doc(db, "numeros", numero.id.toString());

        await updateDoc(docRef, {
            estado: "reservado",
            nombre: `${cliente.nombre}`,
            apellido: `${cliente.apellido}`,
            telefono: `${cliente.telefono}`,
        })
    }

    const handleWhatsApp = () => {
        const mensaje = `Hola! Quiero reservar el número ${numero.id}.\nNombre: ${cliente.nombre} ${cliente.apellido}\nTeléfono: ${cliente.telefono}`;
        const adminNumber = import.meta.env.VITE_ADMINNUMERO;
        const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
            mensaje
        )}`;
        window.open(url, "_blank");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleReserva()
        handleWhatsApp();
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center transition-all">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">
                    Reservar número {transformarNumero(numero.id)}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="bg-slate-100 shadow p-2 rounded"
                        placeholder="Nombre"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="bg-slate-100 shadow p-2 rounded"
                        placeholder="Apellido"
                        value={cliente.apellido}
                        name="apellido"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="bg-slate-100 shadow p-2 rounded"
                        placeholder="3704000000"
                        value={cliente.telefono}
                        name="telefono"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        <FaWhatsapp size={20} /> Reservar número
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-3 text-sm text-gray-700 hover:underline bg-slate-200 p-2 rounded font-semibold w-full"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
