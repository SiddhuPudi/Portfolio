import { Component } from "react";

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CanvasErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <span className="text-gray-600 text-sm font-mono tracking-wider">
            3D scene unavailable
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;
