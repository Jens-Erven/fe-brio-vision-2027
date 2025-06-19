import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Brio Vision 2027
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <Card className="text-center bg-white/50 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-4xl font-bold text-gray-900 sm:text-6xl">
              Welcome to{" "}
              <span className="text-indigo-600">Brio Vision 2027</span>
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Your comprehensive platform for managing users, analyzing data,
              and building the future. Experience powerful tools designed for
              modern businesses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-12">
            <div className="flex items-center justify-center gap-x-6">
              <Link to="/register">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/briowebview">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-16" />

        {/* Features Section */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Everything you need to succeed
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Powerful features to help you manage and grow your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive user management tools for your team
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">Data Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced analytics to drive business insights
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">Future-Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Built for the challenges and opportunities of tomorrow
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-16" />

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Ready to get started?
            </CardTitle>
            <CardDescription className="text-xl text-indigo-100 mt-4">
              Join thousands of companies already using Brio Vision 2027
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-12">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <Separator />

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-transparent border-0">
            <CardContent className="text-center">
              <CardTitle className="text-lg font-semibold text-white">
                Brio Vision 2027
              </CardTitle>
              <CardDescription className="mt-2 text-gray-400">
                Building the future of business management
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  );
}
