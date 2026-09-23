import {mkdir,cp,writeFile} from 'node:fs/promises';
await mkdir('public/models',{recursive:true});await cp('node_modules/@mediapipe/tasks-vision/wasm','public/wasm',{recursive:true});
const r=await fetch('https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite');if(!r.ok)throw Error('Model download failed');await writeFile('public/models/face.tflite',Buffer.from(await r.arrayBuffer()));
