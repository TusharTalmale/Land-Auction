// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    // You could also send the error to a logging service here
    // logErrorToMyService(error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // This is what the user sees when an error occurs in the wrapped components
      return (
        <div className="text-center py-10 text-red-600 bg-white rounded-lg p-4 shadow-md mx-auto max-w-md mt-10">
          <h2 className="text-xl font-semibold mb-3">Oops! Something went wrong.</h2>
          <p className="text-gray-700 mb-4">We're sorry, but an error occurred while displaying this section.</p>
          {/* Optional: Show error details in development, hide in production */}
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="text-sm text-gray-500 text-left">
                  <summary>Error Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                  </pre>
              </details>
          )}
          {/* You could add a button to refresh or go home */}
          {/* <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Refresh Page</button> */}
        </div>
      );
    }

    return this.props.children; // Render the children if no error
  }
}

export default ErrorBoundary; // Export the component