import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '3rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
       
        'quicksand': ['Quicksand', 'sans-serif'],
        'fredericka': ['Fredericka', 'sans-serif'],
        'jawadwipa': ['Jawadwipa', 'sans-serif'],
        'qageto': ['Qageto', 'sans-serif'],
        'romantic': ['romantic', 'sans-serif'],
        'redressed': ['Redressed', 'cursive'],
        'youkiss': ['YOUKISS', 'sans-serif'],
        'jawa': ['Jawa Palsu', 'sans-serif'],
        'newsreader': ['Newsreader', 'serif'],
        'cinzel': ['Cinzel', 'sans-serif'],
        'bloverly': ['Bloverly', 'sans-serif'],
        'saignh': ['Saignh', 'sans-serif'],
        'newscycle': ['NewsCycle', 'sans-serif'],
        'timesnr': ['Times New Roman', 'sans-serif'],
        'garaigit': ['Garaigit', 'sans-serif'],
        'roserri': ['Roserri', 'sans-serif'],
        'amiri': ['Amiri', 'sans-serif'],
        'edwardian': ['Edwardian', 'cursive'],
        'roxborough-cf': ['RoxboroughCF', 'sans-serif']

      },
    },
  },
  plugins: [],
}
export default config
