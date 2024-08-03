import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlPicture } from 'react-icons/sl';
import { IoEllipsisVertical, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { RiSpace } from 'react-icons/ri';
import { FaDownload } from 'react-icons/fa6';
import DashboardButton from './components/DashboardButton.jsx';
import SliderInput from './components/SliderInput.jsx';
import useImageSplit from './hooks/useImageSplit.js';
import useKeyboardShortcut from './hooks/useKeyboardShortcut.js';
import { exportImage } from './utils/imageHelpers.js';
// import { WavyWavesBg } from './utils/wavyWavesBg.module.js';

const App = () => {
  useEffect(() => {
    // 确保DOM元素已挂载
    const box = document.getElementById('box');
    if (box) {
      // eslint-disable-next-line no-undef
      new Color4Bg.BlurGradientBg({
        dom: 'box',
        colors: ["#76EEEB","#09C4CF","#008095","#032B76"],
        loop: true,
      });
    }
  }, []);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const {
    images,
    splitDirection,
    positions,
    refs,
    handleDualImageUpload,
    toggleSplitDirection,
    handlePositionChange,
  } = useImageSplit();

  const toggleDashboard = useCallback(() => {
    setIsDashboardVisible(prev => !prev);
  }, []);

  useKeyboardShortcut(' ', toggleDashboard);

  const handleExportImage = useCallback(() => {
    if (!images.day || !images.night) {
      alert('Please upload two pictures first.');
      return;
    }
    exportImage(refs.dayImage, refs.nightImage);
  }, [images, refs]);

  return (
    // <div className='min-h-screen bg-gradient-to-br from-[#007FFE] to-[#F0FFFE]'>
    <div className='min-h-screen bg-to-transparent' id='box'>
      <div
        ref={refs.imageContainer}
        className='m-4 fixed inset-0 flex justify-center items-center overflow-hidden z-10'
      >
        {images.day && (
          <img
            ref={refs.dayImage}
            src={images.day}
            alt='白天模式'
            className='absolute max-w-full max-h-full object-contain rounded-xl'
          />
        )}
        {images.night && (
          <img
            ref={refs.nightImage}
            src={images.night}
            alt='黑夜模式'
            className='absolute max-w-full max-h-full object-contain rounded-xl'
          />
        )}
        <div ref={refs.splitLine} className='absolute bg-white z-10'></div>
      </div>
      <AnimatePresence>
        {isDashboardVisible && (
          <motion.div
            key='space-preview'
            className='z-10 fixed bottom-6 left-[calc(50%_-_80px)] transform -translate-x-1/2 p-2 bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-500 rounded-lg text-white flex items-center space-x-4'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RiSpace size={24} className='px-22px py-4px bg-[rgba(255,255,255,0.09)] border-1px border-solid border-[rgba(255,255,255,0.8)] rounded-1'/>
            <div className=''>Preview</div>
          </motion.div>
        )}

        {isDashboardVisible && (
          <motion.div
            key='dashboard'
            className='z-10 fixed top-4 right-4 p-4 bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-500 rounded-lg text-white w-74'
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex flex-col space-y-4'>
              <div className='flex justify-between'>
                <DashboardButton
                  onClick={() =>
                    document.getElementById('dualImageInput').click()
                  }
                  icon={<SlPicture />}
                  title='Upload an image'
                  text={images.day && images.night ? 'images' : 'upload!'}
                  textClassName={
                    images.day && images.night ? '' : 'text-red-300'
                  }
                />
                <DashboardButton
                  onClick={toggleSplitDirection}
                  icon={
                    splitDirection === 'vertical' ? (
                      <IoEllipsisVertical />
                    ) : (
                      <IoEllipsisHorizontalSharp />
                    )
                  }
                  title={
                    splitDirection === 'vertical'
                      ? 'Switch to horizontal'
                      : 'Switch to vertical'
                  }
                  text={
                    splitDirection === 'vertical' ? 'vertical' : 'horizontal'
                  }
                />
                <DashboardButton
                  onClick={handleExportImage}
                  icon={<FaDownload />}
                  title='Export'
                  text='Export'
                />
              </div>

              <SliderInput
                label='Start'
                value={positions.start}
                onChange={value => handlePositionChange('start', value)}
              />

              <SliderInput
                label='End'
                value={positions.end}
                onChange={value => handlePositionChange('end', value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <input
        type='file'
        id='dualImageInput'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleDualImageUpload}
      />
    </div>
  );
};

export default App;
