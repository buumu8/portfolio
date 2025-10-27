import { badges } from "../data/badges";
import FeaturedBadges from "../components/FeatureBadges";

export default function Home() {

    const priorityBadges = badges.filter((b) => b.priority);

    return (
        <section className="flex flex-col items-center text-center py-20 px-4 mt-5">
            {/* --- Hero Section --- */}
            <h1 className="text-5xl font-bold mb-4">
                Hi, I’m <span className="text-primary">Jettapol Tuetrakul</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8">
                Cybersecurity. Machine Learning. Web Developing. Real-world defense.
            </p>
            <div className="flex space-x-4">
                <a
                    href={`${import.meta.env.BASE_URL}/resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                >
                    View Resume
                </a>
                <a
                    href={`${import.meta.env.BASE_URL}/projects`}
                    className="px-5 py-2 border border-primary text-primary rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                >
                    View Projects
                </a>
            </div>

            {/* --- About Me Preview --- */}
            <div className="mt-20 max-w-2xl text-left">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    About Me
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    I’m a multilingual Cybersecurity M.S. student at New York University with hands-on experience in SOC operations, network security, and OT/IT threat detection.
                    My work bridges security engineering, mobile security, and incident response — backed by a passion for building safer systems through both human insight and technical precision.
                    With a foundation in machine learning and full-stack web development, I aim to secure the next generation of intelligent and connected technologies.
                </p>
            </div>

            {/* --- Priority Badges  --- */}
            <FeaturedBadges badges={badges} />

        </section >
    );
}
