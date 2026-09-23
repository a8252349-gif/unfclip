// Separable Gaussian convolution, independent of Canvas filter support on Safari.
export function gaussianRGBA(data,width,height,sigma){
 const radius=Math.ceil(sigma*3),kernel=new Float32Array(radius*2+1);let sum=0;
 for(let k=-radius;k<=radius;k++){const v=Math.exp(-(k*k)/(2*sigma*sigma));kernel[k+radius]=v;sum+=v}
 for(let k=0;k<kernel.length;k++)kernel[k]/=sum;
 const temp=new Float32Array(data.length),out=new Uint8ClampedArray(data.length);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)for(let ch=0;ch<3;ch++){
  let v=0;for(let k=-radius;k<=radius;k++)v+=data[(y*width+Math.max(0,Math.min(width-1,x+k)))*4+ch]*kernel[k+radius];temp[(y*width+x)*4+ch]=v;
 }
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*4;for(let ch=0;ch<3;ch++){let v=0;for(let k=-radius;k<=radius;k++)v+=temp[(Math.max(0,Math.min(height-1,y+k))*width+x)*4+ch]*kernel[k+radius];out[i+ch]=v}out[i+3]=255;
 }return out;
}
let patch;
export function blurRegion(canvas,x,y,w,h){
 patch??=document.createElement('canvas');const ratio=Math.min(1,96/Math.max(w,h));
 patch.width=Math.max(2,Math.ceil(w*ratio));patch.height=Math.max(2,Math.ceil(h*ratio));
 const c=patch.getContext('2d',{willReadFrequently:true});c.drawImage(canvas,x,y,w,h,0,0,patch.width,patch.height);
 const pixels=c.getImageData(0,0,patch.width,patch.height);pixels.data.set(gaussianRGBA(pixels.data,patch.width,patch.height,Math.max(2,Math.min(patch.width,patch.height)*.13)));
 // Feather only the outer padding; the central face area stays fully blurred.
 for(let py=0;py<patch.height;py++)for(let px=0;px<patch.width;px++){
  const edge=Math.min((px+.5)/patch.width,(patch.width-px-.5)/patch.width,(py+.5)/patch.height,(patch.height-py-.5)/patch.height);
  const a=Math.min(1,edge/.055);pixels.data[(py*patch.width+px)*4+3]=Math.round(255*a*a*(3-2*a));
 }
 c.putImageData(pixels,0,0);const ctx=canvas.getContext('2d');ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(patch,x,y,w,h);ctx.restore();
}
