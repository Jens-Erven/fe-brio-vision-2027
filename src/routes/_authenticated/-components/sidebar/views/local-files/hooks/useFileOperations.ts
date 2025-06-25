import { useEffect, useState } from 'react';
import type { FileEntry } from '../types';

export const useFileOperations = (
  fileEntries: FileEntry[],
  loadDirectory: (path: string) => Promise<void>,
  currentDir: string | null
): {
  currentPreviewFile: string | null;
  handleOpenWithPreview: (entry: FileEntry) => Promise<void>;
  handleOpenWithExternal: (entry: FileEntry) => Promise<void>;
  handleDelete: (entry: FileEntry) => Promise<void>;
} => {
  const [currentPreviewFile, setCurrentPreviewFile] = useState<string | null>(null);

  const handleOpenWithPreview = async (entry: FileEntry): Promise<void> => {
    if (!entry.isDirectory) {
      try {
        const currentIndex = fileEntries.findIndex((f) => f.path === entry.path);
        if (currentIndex !== -1) {
          // Filter out directories and create a list of files for navigation
          const fileList = fileEntries.map((e) => ({ path: e.path, type: e.ext || '' }));

          // Find the index in the filtered file list
          const fileIndex = fileList.findIndex((f) => f.path === entry.path);

          await window.api.openFileInPreview(entry.path, entry.ext || undefined, fileList, fileIndex);
        }
      } catch (error) {
        console.error('Failed to open file in preview:', error);
      }
    }
  };

  const handleOpenWithExternal = async (entry: FileEntry): Promise<void> => {
    if (!entry.isDirectory) {
      try {
        await window.api.openFileWithExternal(entry.path);
      } catch (error) {
        console.error('Failed to open file with external program:', error);
      }
    }
  };

  const handleDelete = async (entry: FileEntry): Promise<void> => {
    try {
      await window.api.deleteFile(entry.path);
      if (currentDir) {
        loadDirectory(currentDir);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  // Listen for preview file updates
  useEffect(() => {
    const handlePreviewFile = (data: {
      filePath: string;
      fileList?: Array<{ path: string; type: string }>;
      currentIndex?: number;
    }): void => {
      setCurrentPreviewFile(data.filePath);
    };

    window.api.onPreviewFile(handlePreviewFile);

    return () => {
      window.api.removePreviewFileListener();
    };
  }, []);

  return {
    currentPreviewFile,
    handleOpenWithPreview,
    handleOpenWithExternal,
    handleDelete,
  };
};
