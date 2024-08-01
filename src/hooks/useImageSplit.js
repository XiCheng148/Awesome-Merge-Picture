import { useState, useCallback, useRef, useEffect } from 'react';
import { POSITION_DEFAULT, POSITION_MAX } from '../utils/constants.js';
import { checkImageDimensions, loadImage } from '../utils/imageHelpers';

const useImageSplit = () => {
  const [images, setImages] = useState({ day: null, night: null });
  const [splitDirection, setSplitDirection] = useState('vertical');
  const [positions, setPositions] = useState({
    start: POSITION_DEFAULT,
    end: POSITION_DEFAULT,
  });

  const refs = {
    imageContainer: useRef(null),
    dayImage: useRef(null),
    nightImage: useRef(null),
    splitLine: useRef(null),
  };

  const handleDualImageUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    if (files.length !== 2) {
      alert('Please select two images');
      return;
    }

    Promise.all([loadImage(files[0]), loadImage(files[1])])
      .then(([img1, img2]) => {
        if (checkImageDimensions(img1, img2)) {
          const readers = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
              reader.onload = e => resolve(e.target.result);
            });
          });

          Promise.all(readers).then(([dayImage, nightImage]) => {
            setImages({ day: dayImage, night: nightImage });
          });
        } else {
          alert('The aspect ratio of the two images is inconsistent, please upload an image with the same proportion');
        }
      })
      .catch(error => {
        console.error('Error loading images:', error);
        alert('Image loading has failed, please try again.');
      });
  }, []);

  const updateSplitLine = useCallback(() => {
    const { imageContainer, dayImage, nightImage, splitLine } = refs;
    if (
      !imageContainer.current ||
      !dayImage.current ||
      !nightImage.current ||
      !splitLine.current
    )
      return;

    const containerRect = imageContainer.current.getBoundingClientRect();
    const imgRect = dayImage.current.getBoundingClientRect();

    const { start, end } = positions;
    const isVertical = splitDirection === 'vertical';

    const getCoordinate = (position, dimension) =>
      (dimension * position) / POSITION_MAX;

    const startX = isVertical ? getCoordinate(start, imgRect.width) : 0;
    const startY = isVertical ? 0 : getCoordinate(start, imgRect.height);
    const endX = isVertical ? getCoordinate(end, imgRect.width) : imgRect.width;
    const endY = isVertical
      ? imgRect.height
      : getCoordinate(end, imgRect.height);

    const length = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    const angle = Math.atan2(endY - startY, endX - startX);

    splitLine.current.style.width = `${length}px`;
    splitLine.current.style.transform = `rotate(${angle}rad)`;
    splitLine.current.style.left = `${(containerRect.width - imgRect.width) / 2 + startX
      }px`;
    splitLine.current.style.top = `${(containerRect.height - imgRect.height) / 2 + startY
      }px`;

    const clipPath = `polygon(
      ${startX}px ${startY}px,
      ${endX}px ${endY}px,
      ${isVertical ? imgRect.width : endX}px ${isVertical ? endY : imgRect.height
      }px,
      ${isVertical ? imgRect.width : 0}px ${isVertical ? 0 : imgRect.height}px
    )`;
    nightImage.current.style.clipPath = clipPath;
  }, [positions, splitDirection, refs]);

  useEffect(() => {
    if (images.day && images.night) {
      updateSplitLine();
    }
  }, [images, splitDirection, positions, updateSplitLine]);

  const toggleSplitDirection = useCallback(() => {
    setSplitDirection(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  }, []);

  const handlePositionChange = useCallback((type, value) => {
    setPositions(prev => ({ ...prev, [type]: Number(value) }));
  }, []);

  return {
    images,
    splitDirection,
    positions,
    refs,
    handleDualImageUpload,
    updateSplitLine,
    toggleSplitDirection,
    handlePositionChange,
  };
};

export default useImageSplit;
