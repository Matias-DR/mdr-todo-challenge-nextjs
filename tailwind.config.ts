import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    './src/pages/*.tsx',
    './src/pages/**/*.tsx',
    './src/components/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/*.tsx',
    './src/layouts/**/*.tsx'
  ],
  plugins: []
};
export default config
