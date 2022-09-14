/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f8f9ff',
                    100: '#eeeffa',
                    200: '#b9bcec',
                    300: '#9195e1',
                    400: '#696fd6',
                    500: '#4148cb',
                    600: '#2f35aa',
                    700: '#272d90',
                    800: '#1c2068',
                    900: '#15184d',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
