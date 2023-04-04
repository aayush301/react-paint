import { useGlobalContext } from "../context/context";

const useFileActions = () => {
  const { ctx, canvas, drawingState } = useGlobalContext();
  const clearDrawing = () => {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = drawingState.color;
  };

  const saveImage = () => {
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const cut = async () => {
    try {
      await copyToClipboard();
      clearDrawing();
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = async () => {
    return new Promise((resolve, reject) => {
      if (!canvas) return reject("Canvas not present");
      canvas.toBlob(async blob => {
        if (!blob) return reject("Could not create blob");
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        resolve("Copied successfully");
      });
    });
  };

  const pasteFromClipboard = async () => {
    if (!ctx) return Promise.reject("Canvas not found");
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith("image")) {
            const blob = await clipboardItem.getType(type);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
            };
          }
        }
      }
      Promise.resolve("Success");
    } catch (error) {
      Promise.reject("Could not paste image");
    }
  };

  return { clearDrawing, saveImage, cut, copyToClipboard, pasteFromClipboard };
};

export default useFileActions;
