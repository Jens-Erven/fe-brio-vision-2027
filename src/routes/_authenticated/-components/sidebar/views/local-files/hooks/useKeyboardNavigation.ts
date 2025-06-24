import { useCallback, useEffect, useRef, useState } from 'react';
import type { FileEntry } from '../types';

export const useKeyboardNavigation = (fileEntries: FileEntry[]) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const fileListRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (fileEntries.length === 0) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev <= 0 ? fileEntries.length - 1 : prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev >= fileEntries.length - 1 ? 0 : prev + 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < fileEntries.length) {
            const selectedFile = fileEntries[selectedIndex];
            window.api.openFileInPreview(
              selectedFile.path,
              selectedFile.ext || undefined,
              fileEntries.map((e) => ({ path: e.path, type: e.ext || '' })),
              selectedIndex
            );
          }
          break;
      }
    },
    [fileEntries, selectedIndex]
  );

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && fileListRef.current) {
      const selectedElement = fileListRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Update selected index when preview file changes
  useEffect(() => {
    const handlePreviewFile = (data: {
      filePath: string;
      fileList?: Array<{ path: string; type: string }>;
      currentIndex?: number;
    }): void => {
      if (data.currentIndex !== undefined) {
        setSelectedIndex(data.currentIndex);
      }
    };

    window.api.onPreviewFile(handlePreviewFile);

    return () => {
      window.api.removePreviewFileListener();
    };
  }, []);

  return {
    selectedIndex,
    fileListRef,
    setSelectedIndex,
  };
};
