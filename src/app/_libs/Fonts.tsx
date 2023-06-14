import { Inter, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin"],
    preload: true,
});

const roboto_mono = Roboto_Mono({
    variable: "--font-roboto-mono",
    display: "swap",
    subsets: ["latin"],
    preload: true,
});

const jakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    display: "swap",
    subsets: ["latin"],
    preload: true,
});

const Fonts = {
    Inter: inter,
    Jakarta: jakarta,
    Roboto_Mono: roboto_mono,
};

export default Fonts;
