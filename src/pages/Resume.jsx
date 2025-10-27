export default function Resume() {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Resume</h2>
            <p className="text-gray-600 mb-2">Download or view my resume below.</p>
            <a
                href={`${import.meta.env.BASE_URL}/resume.pdf`}
                className="text-blue-500 underline"
                target="_blank"
            >
                View Resume (PDF)
            </a>
        </section>
    );
}
