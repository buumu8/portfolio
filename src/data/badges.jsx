export const badges = [
    {
        name: "Applied Data Science Capstone",
        image: `${import.meta.env.BASE_URL}/badges/applied-data-science-capstone.1.png`,
        url: "https://www.credly.com/badges/46957dea-8162-40ab-af99-172417d87b6b/public_url", // optional link
        issuer: "IBM",
        categories: ["Data Science"],
        priority: false,
    }, {
        name: "Applied Data Science Specialization (V2)",
        image: `${import.meta.env.BASE_URL}/badges/applied-data-science-specialization-v2.png`,
        url: "https://www.credly.com/badges/077b2b5d-b057-4329-8e71-4ed0964e5de1/public_url", // optional link
        issuer: "IBM",
        categories: ["Data Science", "IBM"],
        priority: false,
    }, {
        name: "Associate Cloud Engineer Certification",
        image: `${import.meta.env.BASE_URL}/badges/associate-cloud-engineer-certification.png`,
        url: "https://www.credly.com/badges/af0ca769-ed99-43d3-9ae0-afef78cce2f8/public_url",
        issuer: "Google Cloud",
        categories: ["Cloud", "Google"],
        priority: true,
    }, {
        name: "AWS Certified Cloud Practitioner",
        image: `${import.meta.env.BASE_URL}/badges/aws-certified-cloud-practitioner.png`,
        url: "https://www.credly.com/badges/7756218c-d5de-4192-b5c1-cfb1a5013355/public_url",
        issuer: "AWS",
        categories: ["Cloud", "AWS"],
        priority: true,
    },
    // ...more badges
];

