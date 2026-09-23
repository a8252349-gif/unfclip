import {defineConfig} from 'vite';
export default defineConfig({build:{reportCompressedSize:false,rollupOptions:{output:{manualChunks:{vision:['@mediapipe/tasks-vision'],media:['mediabunny']}}}}});
