import { useEffect } from "react";

export default function useUnloadWarning(conditioin = true) {
  useEffect(() => {
    if (!conditioin) return;

    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, [conditioin]);
}
