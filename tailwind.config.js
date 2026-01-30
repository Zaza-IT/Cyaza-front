/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Garante que o Tailwind lê os ficheiros dentro de src
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Caso não estejas a usar a pasta src (estrutura antiga)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Podes adicionar as cores do Material UI aqui se quiseres misturar
      colors: {
        primary: "#1976d2", // Exemplo de azul do MUI
      }
    },
  },
  plugins: [],
};