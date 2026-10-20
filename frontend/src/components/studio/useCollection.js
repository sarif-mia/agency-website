import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../../services/api";
export default function useCollection(path) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
    path: null,
  });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}${path}`, {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]),
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            response.status === 404
              ? "We couldn’t find that content. It may have moved."
              : "We couldn’t load this content. Please try again.",
          );
        const data = await response.json();
        if (!controller.signal.aborted)
          setState({ data, loading: false, error: "", path });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({
            data: null,
            loading: false,
            error:
              error.name === "TimeoutError"
                ? "This is taking longer than expected. Please try again."
                : error.message,
            path,
          });
      });
    return () => controller.abort();
  }, [path, attempt]);
  const retry = useCallback(() => {
    setState({ data: null, loading: true, error: "", path: null });
    setAttempt((value) => value + 1);
  }, []);
  return state.path === path
    ? { ...state, retry }
    : { data: null, loading: true, error: "", retry };
}
