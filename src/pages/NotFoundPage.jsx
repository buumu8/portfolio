export default function NotFoundPage() {
    return (
        <section className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-600 mb-6">Page not found.</p>
            <a href="/" className="text-blue-500 hover:underline">
                Go back home
            </a>
        </section>
    );
}
