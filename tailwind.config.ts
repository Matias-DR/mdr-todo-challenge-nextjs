import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
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
