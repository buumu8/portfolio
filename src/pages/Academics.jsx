import { useState, useEffect } from "react";
import { academicHistory } from "../data/academics";

export default function Academics() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [degrees, setDegrees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const allCategories = ["All", ...new Set(academicHistory.flatMap((d) => d.categories))];

    setCategories(allCategories);

    setLoading(true);

    setTimeout(() => {
      setDegrees(academicHistory.filter((d) => selectedCategory === "All" || d.categories.includes(selectedCategory)));

      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Academic History</h1>

      <p className="text-gray-600 mb-8">Degrees earned, academic achievements, and completed coursework.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full transition ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {degrees.map((degree) => (
            <div key={degree.id} className="border rounded-xl shadow-md bg-white overflow-hidden">
              {/* Degree Header */}
              <div className="p-6">
                <h2 className="text-2xl font-bold">{degree.degree}</h2>

                <p className="text-gray-600">{degree.institution}</p>

                {degree.gpa && (
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span>
                      {degree.startYear} - {degree.endYear}
                    </span>

                    <span>GPA: {degree.gpa}</span>

                    <span>{degree.honors}</span>
                  </div>
                )}

                <p className="mt-4 text-gray-700">{degree.description}</p>

                {degree.coursework && (
                  <button
                    onClick={() => setExpanded(expanded === degree.id ? null : degree.id)}
                    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {expanded === degree.id ? "Hide Courseworks" : "View Courseworks"}
                  </button>
                )}
              </div>

              {/* Coursework */}
              {expanded === degree.id && (
                <div className="border-t bg-gray-50 p-6">
                  <h3 className="font-semibold mb-4">Courseworks</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Semester</th>
                          <th className="text-left py-2">Code</th>
                          <th className="text-left py-2">Course</th>
                          <th className="text-left py-2">Description</th>
                          <th className="text-left py-2">Grade</th>
                        </tr>
                      </thead>

                      <tbody>
                        {degree.coursework.map((course) => (
                          <tr key={course.code} className="border-b">
                            <td className="py-3 font-small">{course.semester}</td>

                            <td className="py-3">{course.code}</td>

                            <td className="py-3 font-medium">{course.name}</td>

                            <td className="py-3">{course.description}</td>

                            <td className="py-3">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{course.grade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
