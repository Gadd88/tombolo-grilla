import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import type { NumeroType } from "../componentes/GrillaNumeros";
import { AdminFila } from "../componentes";

export const PanelAdmin = () => {
    const { user, logout } = useAuth();
    const [numeros, setNumeros] = useState<NumeroType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNumbers();
    }, [numeros]);

    if (!user) {
        navigate("/login");
        return null;
    }

    const fetchNumbers = async () => {
        const ref = collection(db, "numeros");
        const snapshot = await getDocs(ref);
        const data = snapshot.docs.map((doc) => ({
            id: parseInt(doc.id, 10),
            ...doc.data(),
        }));
        setNumeros(data as NumeroType[]);
    };

    const actualizarEstadoNumeros = async (
        id: NumeroType["id"],
        nuevoEstado: NumeroType["estado"]
    ) => {
        const ref = doc(db, "numeros", id.toString());
        if (nuevoEstado === "disponible") {
            return await updateDoc(ref, {
                estado: "disponible",
                nombre: "",
                apellido: "",
                telefono: "",
            });
        }
        await updateDoc(ref, { estado: nuevoEstado });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Panel de Administración</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Cerrar sesión
                </button>
            </div>
            <Link
                to="/"
                className="p-2 rounded-md bg-cyan-500 font-semibold text-center text-white"
            >
                Volver a la Grilla
            </Link>
            <p className="mt-5 font-semibold text-2xl">
                Bienvenida {user?.email}
            </p>
            <div className="mt-6 text-gray-600">
                <div className="overflow-x-auto mt-1 flex-1 overflow-y-auto max-h-[850px]">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-y-auto">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Numero
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Nombre
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Telefono
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Estado
                                </th>
                                <th className="px-4 py-2 text-center text-sm font-medium">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {numeros
                                .sort((a, b) => a.id - b.id)
                                .map((num) => (
                                    <AdminFila
                                        key={num.id}
                                        num={num}
                                        onChangeStatus={actualizarEstadoNumeros}
                                        cargarNumeros={fetchNumbers}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
