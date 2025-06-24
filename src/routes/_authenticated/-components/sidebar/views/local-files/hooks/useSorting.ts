import { useEffect, useMemo, useState } from 'react';
import type { FileEntry, SortBy, SortSettings } from '../types';
import { SORT_STORAGE_KEY } from '../types';
import { sortEntries } from '../utils';

export const useSorting = (
  entries: FileEntry[],
  search: string
): {
  sortSettings: SortSettings;
  handleSortChange: (sortBy: SortBy) => void;
  filteredAndSortedEntries: FileEntry[];
  fileEntries: FileEntry[];
} => {
  const [sortSettings, setSortSettings] = useState<SortSettings>(() => {
    const saved = window.localStorage.getItem(SORT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { sortBy: 'name', sortOrder: 'asc' };
  });

  // Save sort settings to localStorage whenever they change
  useEffect(() => {
    window.localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(sortSettings));
  }, [sortSettings]);

  const handleSortChange = (sortBy: SortBy): void => {
    setSortSettings((prev) => ({
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedEntries = useMemo(() => {
    const term = search.toLowerCase();
    const filtered = term ? entries.filter((e) => e.name.toLowerCase().includes(term)) : entries;
    return sortEntries(filtered, sortSettings);
  }, [entries, search, sortSettings]);

  // Get the list of files (excluding directories)
  const fileEntries = useMemo(() => {
    return filteredAndSortedEntries.filter((entry) => !entry.isDirectory);
  }, [filteredAndSortedEntries]);

  return {
    sortSettings,
    handleSortChange,
    filteredAndSortedEntries,
    fileEntries,
  };
};
