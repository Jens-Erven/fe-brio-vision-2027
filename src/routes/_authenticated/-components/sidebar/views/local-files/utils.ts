import type { BreadcrumbItem, FileEntry, SortSettings } from './types';

export const sortEntries = (entries: FileEntry[], settings: SortSettings): FileEntry[] => {
  const { sortBy, sortOrder } = settings;

  return [...entries].sort((a, b) => {
    // Always put directories first
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;

    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        break;
      case 'size': {
        // For directories, treat size as 0 for comparison
        const aSize = a.isDirectory ? 0 : (a.size ?? 0);
        const bSize = b.isDirectory ? 0 : (b.size ?? 0);
        comparison = aSize - bSize;
        break;
      }
      case 'type': {
        const aExt = a.ext || '';
        const bExt = b.ext || '';
        comparison = aExt.toLowerCase().localeCompare(bExt.toLowerCase());
        break;
      }
      case 'modified': {
        const aTime = a.modified?.getTime() ?? 0;
        const bTime = b.modified?.getTime() ?? 0;
        comparison = aTime - bTime;
        break;
      }
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const generateBreadcrumbs = (currentDir: string | null): BreadcrumbItem[] | null => {
  if (!currentDir) return null;

  const separator = currentDir.includes('\\') ? '\\' : '/';
  const parts = currentDir.split(/[\\/]+/).filter(Boolean);
  const paths: BreadcrumbItem[] = [];

  // Build cumulative paths
  for (let i = 0; i < parts.length; i++) {
    const pathSoFar = parts.slice(0, i + 1).join(separator);
    const fullPath = currentDir.startsWith(separator) ? separator + pathSoFar : pathSoFar;
    paths.push({
      name: parts[i],
      full: fullPath,
    });
  }

  // If we have more than 3 parts, show first, ellipsis, and last 2
  if (paths.length > 3) {
    return [paths[0], { name: '...', full: '' }, ...paths.slice(-2)];
  }

  return paths;
};
