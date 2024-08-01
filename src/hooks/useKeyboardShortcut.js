import { useEffect, useCallback } from 'react';

const useKeyboardShortcut = (key, callback) => {
  const handleKeyUp = useCallback((e) => {
    if (e.key === key) {
      callback();
    }
  }, [key, callback]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);
};

export default useKeyboardShortcut;
