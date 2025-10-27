import { useState } from "react";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, message } = formData;
        const mailtoLink = `mailto:jettapoltuetrakul@gmail.com?subject=Contact%20from%20${encodeURIComponent(
            name
        )}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;

        window.location.href = mailtoLink;
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-6">Contact Me</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
                <label className="block mb-4">
                    <span className="text-gray-700 dark:text-gray-200">Name</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 dark:text-gray-200">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 dark:text-gray-200">Message</span>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    ></textarea>
                </label>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Send Message
                </button>

                {status && <p className="mt-4 text-green-500">{status}</p>}
            </form>
        </section>
    );
}

export default ContactPage;
