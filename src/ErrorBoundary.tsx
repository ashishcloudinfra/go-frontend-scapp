import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
          <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">
            Oops! Something went wrong.
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            We’re sorry, but the page you’re looking for doesn’t exist or an unexpected error occurred.
          </p>
          <button
            onClick={() => window.location.assign("/")}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
