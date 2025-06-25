import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, MoreVertical } from "lucide-react";
import { FileIcon, defaultStyles } from "react-file-icon";
import type { FileEntry } from "./types";

interface Props {
  entry: FileEntry;
  onOpenWithPreview: () => void;
  onOpenWithExternal: () => void;
  onDelete: () => void;
  onFolderClick?: () => void;
  isCurrentPreview?: boolean;
  isSelected?: boolean;
}

function formatBytes(bytes: number | null): string {
  if (bytes === null || bytes === undefined) return "";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "kB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1));
  return `${value} ${sizes[i]}`;
}

function getIconAndLabel(entry: FileEntry): {
  icon: React.ReactNode;
  label: string;
} {
  if (entry.isDirectory) {
    return {
      icon: <Folder className="text-amber-500 w-6 h-6" />,
      label: "FOLDER",
    };
  }

  const ext = (entry.ext ?? "").toLowerCase();

  const style = (defaultStyles as Record<string, object>)[ext] ?? {};

  const icon = (
    <div className="w-6 h-6">
      <FileIcon extension={ext} {...style} />
    </div>
  );

  return {
    icon,
    label: ext ? ext.toUpperCase() : "FILE",
  };
}

export const FileItemCard: React.FC<Props> = ({
  entry,
  onOpenWithPreview,
  onOpenWithExternal,
  onDelete,
  onFolderClick,
  isCurrentPreview,
  isSelected,
}) => {
  const { icon } = getIconAndLabel(entry);

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (entry.isDirectory) {
      onFolderClick?.();
    } else if (!(e.target as HTMLElement).closest(".dropdown-menu")) {
      onOpenWithPreview();
    }
  };

  // const handleShowInFolder = async (e: React.MouseEvent): Promise<void> => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     await window.api.showItemInFolder(entry.path);
  //   } catch (error) {
  //     console.error("Failed to show file in folder:", error);
  //   }
  // };

  // const handleDragStart = (e: React.DragEvent): void => {
  //   // Set data for internal drag and drop within the app
  //   e.dataTransfer.setData("application/file-data", JSON.stringify(entry));

  //   // Also set text data for external drops
  //   e.dataTransfer.setData("text/plain", entry.path);

  //   // For external drag to desktop (files only)
  //   if (!entry.isDirectory) {
  //     // Let the drag event proceed naturally, then trigger the IPC call
  //     setTimeout(() => {
  //       window.api.startDrag(entry.path);
  //     }, 0);
  //   }

  //   // Set drag effect
  //   e.dataTransfer.effectAllowed = entry.isDirectory ? "copy" : "copyMove";
  // };

  return (
    <a
      href=""
      key={entry.path}
      className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center border-b p-4 text-sm leading-tight last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isCurrentPreview
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : ""
      } ${isSelected ? "bg-sidebar-accent/50" : ""}`}
      onClick={handleClick}
      draggable={true}
      // onDragStart={handleDragStart}
    >
      {/* Left content - 3/4 of the space */}
      <div className="flex items-center gap-3 min-w-0 flex-[3]">
        <span className="shrink-0">{icon}</span>

        <div className="flex min-w-0 flex-col flex-1">
          <span className="font-medium truncate" title={entry.name}>
            {entry.name}
          </span>
          <span className="text-xs opacity-70 truncate">
            {entry.modified ? entry.modified.toLocaleString() : ""}
          </span>
        </div>
      </div>

      {/* Right content - 1/4 of the space */}
      <div className="flex-[1] flex justify-end text-right min-w-0">
        {!entry.isDirectory && (
          <span
            className="text-xs tabular-nums opacity-70 truncate"
            title={formatBytes(entry.size)}
          >
            {formatBytes(entry.size)}
          </span>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!entry.isDirectory && (
            <>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenWithPreview();
                }}
              >
                Openen met preview
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenWithExternal();
                }}
              >
                Openen met extern programma
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                //    onClick={handleShowInFolder}
              >
                Toon in verkenner
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={true}
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Toewijzen
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            disabled={entry.isDirectory}
            onSelect={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            Verwijderen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </a>
  );
};
