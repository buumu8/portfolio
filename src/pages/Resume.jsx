import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useState } from 'react';

function ResumePage() {
    const [error, setError] = useState(false);

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-4">Resume</h1>
            <div className="w-full h-[80vh] border shadow-md flex items-center justify-center">
                {error ? (
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Resume PDF not found.</p>
                        <a href={`${import.meta.env.BASE_URL}/resume.pdf`} download className="text-blue-500 hover:underline">
                            Download PDF
                        </a>
                    </div>
                ) : (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={`${import.meta.env.BASE_URL}/resume.pdf`} onError={() => setError(true)} />
                    </Worker>
                )}
            </div>
        </section >
    );
}

export default ResumePage;
