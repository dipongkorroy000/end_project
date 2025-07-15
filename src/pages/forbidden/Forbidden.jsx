import { FaArrowLeft, FaLock } from "react-icons/fa";
import { Link } from "react-router";


export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">
      <div className="max-w-md">
        <div className="text-red-500 text-6xl mb-4">
          <FaLock className="mx-auto"/>
        </div>
        <h1 className="text-4xl font-bold mb-2">403 – Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page. This area is restricted to authorized users only.
        </p>
        <Link to="/" className="btn btn-primary text-red-700">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}