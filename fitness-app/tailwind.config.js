/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Oswald', 'sans-serif'], // Main body font
		  heading: ['Cinzel', 'serif'],  // For Gladiator-style headings
		  display: ['Protest Revolution', 'sans-serif'], // Bold display font
		  serif: ['Bitter', 'serif'], // For secondary content or elegance
		},
		colors: {
		  background: 'var(--background)',
		  foreground: 'var(--foreground)',
		  card: {
			DEFAULT: 'var(--card)',
			foreground: 'var(--card-foreground)'
		  },
		  popover: {
			DEFAULT: 'var(--popover)',
			foreground: 'var(--popover-foreground)'
		  },
		  primary: {
			DEFAULT: 'var(--primary)',
			foreground: 'var(--primary-foreground)'
		  },
		  secondary: {
			DEFAULT: 'var(--secondary)',
			foreground: 'var(--secondary-foreground)'
		  },
		  muted: {
			DEFAULT: 'var(--muted)',
			foreground: 'var(--muted-foreground)'
		  },
		  accent: {
			DEFAULT: 'var(--accent)',
			foreground: 'var(--accent-foreground)'
		  },
		  destructive: {
			DEFAULT: 'var(--destructive)',
			foreground: 'var(--destructive-foreground)'
		  },
		  border: 'var(--border)',
		  input: 'var(--input)',
		  ring: 'var(--ring)',
		  chart: {
			'1': 'var(--chart-1)',
			'2': 'var(--chart-2)',
			'3': 'var(--chart-3)',
			'4': 'var(--chart-4)',
			'5': 'var(--chart-5)'
		  },
		},
		fontSize: {
		  sm: 'clamp(1rem, 0.95rem + 0.4vw, 1.125rem)',
		  base: 'clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)',
		  lg: 'clamp(1.5rem, 1.25rem + 0.5vw, 1.75rem)',
		  xl: 'clamp(1.75rem, 1.7rem + 0.65vw, 2rem)',
		  '2xl': 'clamp(2rem, 1.85rem + 0.75vw, 2.25rem)',
		  '3xl': 'clamp(2.25rem, 2rem + 0.85vw, 2.5rem)',
		  '4xl': 'clamp(2.5rem, 2.15rem + 0.95vw, 2.75rem)',
		  '5xl': 'clamp(2.75rem, 2.3rem + 1.05vw, 3rem)',
		  '6xl': 'clamp(3rem, 2.45rem + 1.15vw, 3.25rem)',
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }