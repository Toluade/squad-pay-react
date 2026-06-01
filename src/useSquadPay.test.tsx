import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import React from "react";
import useSquadPay from "./useSquadPay";
import SquadProvider, { useSquadContext } from "./SquadProvider";

const SCRIPT_SRC = "https://checkout.squadco.com/widget/squad.min.js";

let setup: ReturnType<typeof vi.fn>;
let open: ReturnType<typeof vi.fn>;
let squadConstructor: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setup = vi.fn();
  open = vi.fn();
  squadConstructor = vi.fn(() => ({ setup, open }));
  (window as any).squad = squadConstructor;
});

afterEach(() => {
  document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`).forEach((s) => s.remove());
  delete (window as any).squad;
  vi.restoreAllMocks();
});

describe("useSquadPay", () => {
  it("instantiates window.squad and opens the widget with amount converted to kobo", () => {
    const { result } = renderHook(() => useSquadPay({ publicKey: "pk_test" }));

    result.current({ amount: 50, email: "user@example.com" });

    expect(squadConstructor).toHaveBeenCalledTimes(1);
    const config = squadConstructor.mock.calls[0][0];
    expect(config.key).toBe("pk_test");
    expect(config.email).toBe("user@example.com");
    expect(config.amount).toBe(5000); // 50 * 100
    expect(setup).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledTimes(1);
  });

  it("injects the checkout script only once across multiple mounts", () => {
    renderHook(() => useSquadPay({ publicKey: "pk_test" }));
    renderHook(() => useSquadPay({ publicKey: "pk_test" }));

    const scripts = document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`);
    expect(scripts.length).toBe(1);
  });
});

describe("useSquadContext", () => {
  it("throws a helpful error when used outside SquadProvider", () => {
    expect(() => renderHook(() => useSquadContext())).toThrow(
      /must be used inside the SquadProvider/i
    );
  });

  it("provides squadPay when rendered inside SquadProvider", () => {
    let received: unknown;
    const Consumer = () => {
      received = useSquadContext().squadPay;
      return null;
    };

    render(
      <SquadProvider publicKey="pk_test">
        <Consumer />
      </SquadProvider>
    );

    expect(typeof received).toBe("function");
  });
});
