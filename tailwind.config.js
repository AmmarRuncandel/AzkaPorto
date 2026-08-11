/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			},
			colors: {
				primary: '#38BDF8',     /* Aksen cerah: Sky Blue, sangat elegan dipadukan dengan Navy */
				secondary: '#133458',   /* Tema dasar utama (Background) sesuai permintaan Anda */
				textMain: '#F8FAFC',    /* Teks putih bersih/Slate 50 untuk kontras maksimal */
				textMuted: '#94A3B8',   /* Teks sekunder/Slate 400 agar tetap terbaca namun tidak menyilaukan */
			}
		  },
		},
	plugins: [],
}
