export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
  modified: Date | null;
  size: number | null;
  ext: string | null;
}

export type SortBy = 'name' | 'size' | 'type' | 'modified';
export type SortOrder = 'asc' | 'desc';

export interface SortSettings {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface BreadcrumbItem {
  name: string;
  full: string;
}

export const LOCAL_STORAGE_KEY = 'localFilesView.rootDirectory';
export const SORT_STORAGE_KEY = 'localFilesView.sortSettings';
