import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-gray-600">Oops! The page you are looking for does not exist.</p>
            <Link
                href="/"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Go Back Home
            </Link>
        </div>
    );
}
