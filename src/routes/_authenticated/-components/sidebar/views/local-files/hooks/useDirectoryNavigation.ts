import { useCallback, useEffect, useState } from 'react';
import type { FileEntry } from '../types';
import { LOCAL_STORAGE_KEY } from '../types';

export const useDirectoryNavigation = (): {
  rootDir: string | null;
  currentDir: string | null;
  entries: FileEntry[];
  loading: boolean;
  error: string | null;
  loadDirectory: (path: string) => Promise<void>;
  handleChooseFolder: () => Promise<void>;
  handleFolderClick: (entry: FileEntry) => Promise<void>;
  navigateToPath: (path: string) => Promise<void>;
} => {
  const [rootDir, setRootDir] = useState<string | null>(() => window.localStorage.getItem(LOCAL_STORAGE_KEY));
  const [currentDir, setCurrentDir] = useState<string | null>(rootDir);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDirectory = useCallback(async (path: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const res = await window.api.getDirectoryContents(path);
      if ('error' in res) {
        throw new Error(res.error || 'Failed to get directory contents');
      }
      // Convert modified to Date | null
      const processed: FileEntry[] = res.map((r) => ({
        ...r,
        modified: r.modified ? new Date(r.modified) : null,
      }));
      setEntries(processed);
      setCurrentDir(path);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load directory');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChooseFolder = async (): Promise<void> => {
    const path = await window.api.selectDirectory();
    if (path) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, path);
      setRootDir(path);
    }
  };

  const handleFolderClick = async (entry: FileEntry): Promise<void> => {
    if (entry.isDirectory) {
      try {
        await loadDirectory(entry.path);
        // Update the root directory in localStorage when navigating into a folder
        window.localStorage.setItem(LOCAL_STORAGE_KEY, entry.path);
        setRootDir(entry.path);
      } catch (error) {
        console.error('Failed to navigate to folder:', error);
      }
    }
  };

  const navigateToPath = async (path: string): Promise<void> => {
    await loadDirectory(path);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, path);
    setRootDir(path);
  };

  // Initial load
  useEffect(() => {
    if (rootDir) loadDirectory(rootDir);
  }, [rootDir, loadDirectory]);

  return {
    rootDir,
    currentDir,
    entries,
    loading,
    error,
    loadDirectory,
    handleChooseFolder,
    handleFolderClick,
    navigateToPath,
  };
};
