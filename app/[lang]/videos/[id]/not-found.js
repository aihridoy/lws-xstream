'use client';

const NotFound = ({ message }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-color-bg text-white font-exo">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">404 - Not Found</h1>
                <p className="text-lg">{message || "The page you are looking for doesn't exist."}</p>
            </div>
        </div>
    );
};

export default NotFound;
