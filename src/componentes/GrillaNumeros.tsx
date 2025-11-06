import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { CeldaNumero } from "./CeldaNumero";
import { ModalReserva } from "./ModalReserva";

export type NumeroType = {
    id: number;
    estado: "disponible" | "vendido" | "reservado";

    // Campos opcionales (solo existen cuando el estado es "vendido")
    nombre?: string;
    apellido?: string;
    telefono?: string;
};

export const GrillaNumeros = () => {
    const [numeros, setNumeros] = useState<NumeroType[]>([]);
    const [cargando, setCargando] = useState(true);
    const [numeroSeleccionado, setNumeroSeleccionado] =
        useState<NumeroType | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (num: NumeroType) => {
        if (num.estado === "disponible") {
            setNumeroSeleccionado(num);
            setShowModal(true);
        }
    };

    useEffect(() => {
        const q = query(collection(db, "numeros"), orderBy("id"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const numerosData = snapshot.docs.map((doc) => ({
                id: parseInt(doc.id, 10),
                ...(doc.data() as Omit<NumeroType, "id">),
            }));
            setNumeros(numerosData);
            setCargando(false);
        });
        return () => unsubscribe();
    }, []);

    if (cargando) {
        return <div>Cargando números...</div>;
    }

    return (
        <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-w-3xl mx-auto mt-6 mb-6">
            {numeros.map((numero) => (
                <CeldaNumero
                    key={numero.id}
                    data={numero}
                    onSelect={handleSelect}
                />
            ))}
            {showModal && (
                <ModalReserva
                    numero={numeroSeleccionado!}
                    onClose={() => setShowModal(false)}
                    // onConfirm={handleReserve}
                />
            )}
        </div>
    );
};
