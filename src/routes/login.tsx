import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/theme-context";
import { createFileRoute } from "@tanstack/react-router";
import { Moon, Palette, Sun } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="h-4 w-4 mr-2" />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("default")}>
                  {theme === "default" && "✓ "}Default
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("modern-minimal")}>
                  {theme === "modern-minimal" && "✓ "}Modern Minimal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("supabase")}>
                  {theme === "supabase" && "✓ "}Supabase
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={toggleMode}>
              {mode === "light" ? (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Sign In</Button>
          <div className="text-center">
            <a
              href="/register"
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
