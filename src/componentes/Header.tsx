import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const { user } = useAuth();
    return (
        <header className="w-full bg-blue-600 text-white shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                    Tómbola
                </h1>
            {user ? (
                <Link
                    to="admin"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ms-auto mx-5"
                >
                    Panel Admin
                </Link>
            ) : (
                <Link
                    to="login"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ms-auto mx-5"
                >
                    Login
                </Link>
            )}
            </div>
        </header>
    );
};
