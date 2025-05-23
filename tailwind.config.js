// tailwind.config.js
// const pastelTheme = {
//     name: "pastel";
//     default: false;
//     prefersdark: false;
//     color-scheme: "light";
//     --color-base-100: oklch(60% 0.27 27);
//     --color-base-200: oklch(98.462% 0.001 247.838);
//     --color-base-300: oklch(92.462% 0.001 247.838);
//     --color-base-content: oklch(20% 0 0);
//     --color-primary: oklch(25% 0.09 281.288);
//     --color-primary-content: oklch(49% 0.265 301.924);
//     --color-secondary: oklch(47% 0.137 46.201);
//     --color-secondary-content: oklch(51% 0.222 16.935);
//     --color-accent: oklch(90% 0.093 164.15);
//     --color-accent-content: oklch(50% 0.118 165.612);
//     --color-neutral: oklch(55% 0.046 257.417);
//     --color-neutral-content: oklch(92% 0.013 255.508);
//     --color-info: oklch(86% 0.127 207.078);
//     --color-info-content: oklch(52% 0.105 223.128);
//     --color-success: oklch(87% 0.15 154.449);
//     --color-success-content: oklch(52% 0.154 150.069);
//     --color-warning: oklch(83% 0.128 66.29);
//     --color-warning-content: oklch(55% 0.195 38.402);
//     --color-error: oklch(80% 0.114 19.571);
//     --color-error-content: oklch(50% 0.213 27.518);
//     --radius-selector: 2rem;
//     --radius-field: 1rem;
//     --radius-box: 2rem;
//     --size-selector: 0.25rem;
//     --size-field: 0.25rem;
//     --border: 2px;
//     --depth: 1;
//     --noise: 1;
// };


module.exports = {
    content: ["./views/**/*.ejs", "./public/**/*.js"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Barlow', 'sans-serif'],
            },
            colors: {
                primary: " #000000",
                secondary: " #8F4FFF	",
                accent: " #f4f4f4",
                neutral: "	#fafafa",
                "base-100": "#F3F4F6",
                info: "#3ABFF8",
                success: "#36D399",
                warning: "#FBBF24",
                error: "#F87171",
                logo: "#5FC4B6" // from InkSpiration palette n logo colors
            },
            animation: { //added animations for text on index.ejs, cool backflips, lasts like 1 sec
                'fade-down': 'fadeDown 1.3s ease-out',
                'fade-up': 'fadeUp 1.3s ease-out',
                'slide-in': 'slideIn 1.3s ease-out',
                'slide-in-left': 'slideInLeft 1s ease-out',
                'slide-in-right': 'slideInRight 1s ease-out',
            },
            keyframes: {
                fadeDown: {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                fadeUp: {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                slideIn: {
                '0%': { opacity: 0, transform: 'translateX(-30px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
                },
                slideInLeft: {
                '0%': { opacity: 0, transform: 'translateX(-50%)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
                },
                slideInRight: {
                '0%': { opacity: 0, transform: 'translateX(50%)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
                },
            }
            },
        },
        plugins: []
        }
    
    
