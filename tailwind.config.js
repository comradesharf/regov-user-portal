/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-jakarta)"],
                mono: ["var(--font-roboto-mono)"],
            },
            fontSize: {
                "2xs": "0.625rem",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["fantasy"],
    },
};
