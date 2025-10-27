

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function ResumePage() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-2xl font-bold mb-4">My Resume</h1>
            <div className="w-full h-[80vh] border shadow-md">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={`${import.meta.env.BASE_URL}/resume.pdf`} />
                </Worker>
            </div>
        </section>
    );
}

export default ResumePage;

// { `${import.meta.env.BASE_URL}/resume.pdf` }