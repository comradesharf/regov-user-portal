/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        "date-fns": {
            transform: "date-fns/{{member}}",
        },
        "lodash-es": {
            transform: "lodash-es/{{member}}",
        },
    },
    rewrites() {
        const routes = [];
        if (process.env.NODE_ENV === "production") {
            routes.push({
                source: "/__/auth/:path*",
                destination: `https://regov-user-portal.firebaseapp.com/__/auth/:path*`,
            });
        }
        return routes;
    },
};

module.exports = nextConfig;
