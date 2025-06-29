import { Badge, Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import { Clock, ExternalLink, Home, RotateCcw } from "lucide-react";
import * as React from "react";

interface NavigationHistoryEntry {
  id: string;
  path: string;
  timestamp: Date;
  title?: string;
  params?: Record<string, any>;
  search?: Record<string, any>;
}

const STORAGE_KEY = "tanstack-router-navigation-history";
const MAX_HISTORY_ITEMS = 50;

export function NavigationHistoryView(): React.JSX.Element {
  const router = useRouter();
  const [history, setHistory] = React.useState<NavigationHistoryEntry[]>([]);

  // Load initial history from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
        setHistory(parsed);
      }
    } catch (error) {
      console.warn(
        "Failed to load navigation history from localStorage:",
        error
      );
    }
  }, []);

  // Subscribe to router navigation events
  React.useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", (event) => {
      const { toLocation } = event;

      // Create new entry for any navigation
      const newEntry: NavigationHistoryEntry = {
        id: `${Date.now()}-${Math.random()}`,
        path: toLocation.pathname,
        timestamp: new Date(),
        search:
          toLocation.search && Object.keys(toLocation.search).length > 0
            ? toLocation.search
            : undefined,
      };

      setHistory((prev) => {
        // Avoid duplicates for consecutive same routes
        if (prev.length > 0 && prev[0].path === newEntry.path) {
          return prev;
        }

        const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);

        // Save to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (error) {
          console.warn(
            "Failed to save navigation history to localStorage:",
            error
          );
        }

        return updated;
      });
    });

    // Also subscribe to other navigation events for debugging
    const unsubscribeBeforeNavigate = router.subscribe(
      "onBeforeNavigate",
      (event) => {
        console.log("Before navigate:", event);
      }
    );

    return () => {
      unsubscribe();
      unsubscribeBeforeNavigate();
    };
  }, [router]);

  // Add current location to history on mount if not already present
  React.useEffect(() => {
    const currentLocation = router.state.location;

    if (currentLocation && currentLocation.pathname !== "/") {
      const currentEntry: NavigationHistoryEntry = {
        id: `current-${Date.now()}`,
        path: currentLocation.pathname,
        timestamp: new Date(),
        search:
          currentLocation.search &&
          Object.keys(currentLocation.search).length > 0
            ? currentLocation.search
            : undefined,
      };

      setHistory((prev) => {
        // Only add if not already present
        if (prev.length === 0 || prev[0].path !== currentEntry.path) {
          const updated = [currentEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch (error) {
            console.warn(
              "Failed to save current location to localStorage:",
              error
            );
          }
          return updated;
        }
        return prev;
      });
    }
  }, [router.state.location]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const navigateToRoute = (
    path: string,
    params?: Record<string, any>,
    search?: Record<string, any>
  ) => {
    router.navigate({
      to: path,
      ...(search && { search }),
    });
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getRouteTitle = (path: string) => {
    const routeTitles: Record<string, string> = {
      "/": "Home",
      "/login": "Login",
      "/register": "Register",
      "/dashboard": "Dashboard",
      "/analytics": "Analytics",
      "/settings": "Settings",
      "/users": "Users",
      "/briowebview": "Brio Web View",
    };
    return routeTitles[path] || path;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <CardTitle className="text-sm font-medium truncate">
              Navigation History
            </CardTitle>
          </div>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="h-6 px-2 text-xs flex-shrink-0"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <CardDescription className="text-xs truncate">
          Recent navigation history ({history.length} entries)
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4 pb-4 scrollbar-fade">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Clock className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No navigation history yet</p>
              <p className="text-xs mt-1 px-2 leading-relaxed">
                Navigate to different pages to see your history
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((entry, index) => (
                <div key={entry.id} className="min-w-0">
                  <div
                    className="group flex items-start justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors min-w-0 w-full"
                    onClick={() =>
                      navigateToRoute(entry.path, entry.params, entry.search)
                    }
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0 overflow-hidden">
                      <div className="flex-shrink-0 mt-0.5">
                        {entry.path === "/" ? (
                          <Home className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="text-xs font-medium break-words leading-tight">
                          {getRouteTitle(entry.path)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <Badge
                        variant="outline"
                        className="text-xs px-1 py-0 h-5 whitespace-nowrap flex-shrink-0"
                      >
                        {formatTimestamp(entry.timestamp)}
                      </Badge>
                    </div>
                  </div>
                  {index < history.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
