export const checkImageDimensions = (img1, img2) => {
  const ratio1 = img1.width / img1.height;
  const ratio2 = img2.width / img2.height;
  const tolerance = 0.01; // 允许1%的误差

  return Math.abs(ratio1 - ratio2) < tolerance;
};

export const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const exportImage = (dayImageRef, nightImageRef) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = dayImageRef.current.naturalWidth;
  canvas.height = dayImageRef.current.naturalHeight;

  ctx.drawImage(dayImageRef.current, 0, 0);

  ctx.beginPath();
  const clipPath = nightImageRef.current.style.clipPath;
  const polygonPoints = clipPath.match(/(\d+(\.\d+)?)/g);
  if (polygonPoints) {
    const scaleX = canvas.width / dayImageRef.current.offsetWidth;
    const scaleY = canvas.height / dayImageRef.current.offsetHeight;
    ctx.moveTo(
      parseFloat(polygonPoints[0]) * scaleX,
      parseFloat(polygonPoints[1]) * scaleY
    );
    for (let i = 2; i < polygonPoints.length; i += 2) {
      ctx.lineTo(
        parseFloat(polygonPoints[i]) * scaleX,
        parseFloat(polygonPoints[i + 1]) * scaleY
      );
    }
    ctx.closePath();
    ctx.clip();
  }

  ctx.drawImage(nightImageRef.current, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'merged_image.png';
  link.href = dataURL;
  link.click();
};
