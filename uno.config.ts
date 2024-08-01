import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: {
    'btn-circle': 'w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-300 hover:bg-gray-400 hover:transform hover:scale-120 transition-all text-white',
    'slider': 'w-full h-2 bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-300 rounded-lg appearance-none cursor-pointer',
  },
  theme: {
    extend: {
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
});
