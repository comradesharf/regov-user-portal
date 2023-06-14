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
};

module.exports = nextConfig;
