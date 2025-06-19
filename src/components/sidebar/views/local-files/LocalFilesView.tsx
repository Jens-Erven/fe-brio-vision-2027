import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderPen } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { FileItemCard } from "./FileItemCard";
import { SortControls } from "./components/SortControls";
import { useDirectoryNavigation } from "./hooks/useDirectoryNavigation";
import { useFileOperations } from "./hooks/useFileOperations";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useSorting } from "./hooks/useSorting";
import { generateBreadcrumbs } from "./utils";

export function LocalFilesView(): React.JSX.Element {
  const [search, setSearch] = useState("");

  // Use extracted hooks
  const directoryNav = useDirectoryNavigation();
  const sorting = useSorting(directoryNav.entries, search);
  const keyboard = useKeyboardNavigation(sorting.fileEntries);
  const fileOps = useFileOperations(
    sorting.fileEntries,
    directoryNav.loadDirectory,
    directoryNav.currentDir
  );

  const breadcrumbs = generateBreadcrumbs(directoryNav.currentDir);

  if (!directoryNav.rootDir) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-sm opacity-70">No folder selected</p>
        <Button onClick={directoryNav.handleChooseFolder}>
          Choose Folder…
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col gap-2 flex-shrink-0">
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap min-w-0">
            {breadcrumbs?.map((b, idx) => (
              <React.Fragment key={b.full || idx}>
                <BreadcrumbItem className="min-w-0">
                  {idx === breadcrumbs.length - 1 || b.name === "..." ? (
                    <span className="font-medium truncate">{b.name}</span>
                  ) : (
                    <BreadcrumbLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (b.full) {
                          directoryNav.navigateToPath(b.full);
                        }
                      }}
                      className="cursor-pointer truncate"
                    >
                      {b.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search and Sort Controls */}
        <div className="w-full flex flex-row gap-2 min-w-0">
          <Input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0"
          />

          <SortControls
            sortSettings={sorting.sortSettings}
            onSortChange={sorting.handleSortChange}
          />

          <Button
            variant="outline"
            size="icon"
            onClick={directoryNav.handleChooseFolder}
            className="flex items-center gap-1 flex-shrink-0"
          >
            <FolderPen />
          </Button>
        </div>
      </div>

      {directoryNav.error && (
        <p className="text-destructive text-sm p-4 flex-shrink-0 truncate">
          {directoryNav.error}
        </p>
      )}

      <div
        className="flex-1 overflow-auto min-w-0 w-full"
        ref={keyboard.fileListRef}
      >
        {directoryNav.loading ? (
          <p className="p-4 text-sm opacity-70">Loading…</p>
        ) : sorting.filteredAndSortedEntries.length === 0 ? (
          <p className="p-4 text-sm opacity-70">No files found</p>
        ) : (
          sorting.filteredAndSortedEntries.map((entry) => (
            <FileItemCard
              key={entry.path}
              entry={entry}
              onOpenWithPreview={() => fileOps.handleOpenWithPreview(entry)}
              onOpenWithExternal={() => fileOps.handleOpenWithExternal(entry)}
              onDelete={() => fileOps.handleDelete(entry)}
              onFolderClick={() => directoryNav.handleFolderClick(entry)}
              isCurrentPreview={entry.path === fileOps.currentPreviewFile}
              isSelected={
                !entry.isDirectory &&
                sorting.fileEntries.indexOf(entry) === keyboard.selectedIndex
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
