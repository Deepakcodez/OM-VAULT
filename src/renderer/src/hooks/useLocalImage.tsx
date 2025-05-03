import { useState, useEffect } from 'react';

export const useLocalImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(null);
   const [filePath, setFilePath] = useState<string | null | undefined>("");

  useEffect(() => {
    const loadImage = async () => {
      if (window.electron && filePath) {
        const src = await window.electron.getLocalImage(filePath);
        setImageSrc(src);
      }
    };

    loadImage();
  }, [filePath]);

  return {imageSrc, setFilePath};
};