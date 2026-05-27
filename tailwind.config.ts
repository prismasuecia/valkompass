import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './store/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        paper: '#F8FAFC',
        line: '#E5E7EB'
      }
    }
  },
  plugins: []
};

export default config;
