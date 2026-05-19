import { Component } from "react";

export class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log the error for debugging — swap with Sentry/LogRocket in production:
    // Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
    console.error("[GlobalErrorBoundary] Uncaught error:", error);
    console.error("[GlobalErrorBoundary] Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#050505",
            color: "#fff",
            fontFamily: "monospace",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "#06b6d4",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            System Error
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
            Something crashed
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              background: "transparent",
              border: "1px solid #06b6d4",
              color: "#06b6d4",
              borderRadius: "9999px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
