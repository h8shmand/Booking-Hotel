import { useEffect } from "react";

export default function useCloserOptions(ref, exception, action) {
  useEffect(() => {
    function handleCloser(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exception
      ) {
        action();
      }
    }
    document.addEventListener("mousedown", handleCloser);
    return () => document.removeEventListener("mousedown", handleCloser);
  }, [ref, action]);
}
