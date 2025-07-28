import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import ProtectedRoute from "../ProtectedRoute";

// Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { id: "1", username: "testuser" },
  }),
}));

describe("ProtectedRoute", () => {
  it("renders children when authenticated", () => {
    const TestComponent = () => <div>Protected Content</div>;

    render(<ProtectedRoute element={TestComponent} />);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
