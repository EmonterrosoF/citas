import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Página no encontrada
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
