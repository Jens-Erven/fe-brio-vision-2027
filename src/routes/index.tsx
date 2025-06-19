import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Welcome to <span className="text-indigo-600">Brio Vision 2027</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive platform for managing users, analyzing data, and
            building the future. Experience powerful tools designed for modern
            businesses.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/register">
              <Button size="lg" className="px-8 py-4 text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              Everything you need to succeed
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you manage and grow your business
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👥</div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Efficiently manage users, roles, and permissions with our
                  intuitive interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/users">
                  <Button variant="outline">Explore Users</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle>Dashboard & Analytics</CardTitle>
                <CardDescription>
                  Get real-time insights with comprehensive dashboards and
                  detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/analytics">
                  <Button variant="outline">View Analytics</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">⚙️</div>
                <CardTitle>Customizable Settings</CardTitle>
                <CardDescription>
                  Configure your platform to match your workflow and business
                  needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/settings">
                  <Button variant="outline">Configure Settings</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-indigo-600 rounded-2xl px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white">
            Ready to get started?
          </h3>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of companies already using Brio Vision 2027
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h4 className="text-lg font-semibold">Brio Vision 2027</h4>
            <p className="mt-2 text-gray-400">
              Building the future of business management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
