import { RefreshCw } from "lucide-react";
export default function CollectionState({ loading, error, retry, empty }) {
  if (loading)
    return (
      <div className="collection-state" role="status">
        <span className="spinner" /> Loading…
      </div>
    );
  if (error)
    return (
      <div className="collection-state" role="alert">
        <p>{error}</p>
        <button className="button button-outline" onClick={retry}>
          Try again <RefreshCw size={16} />
        </button>
      </div>
    );
  if (empty)
    return (
      <div className="collection-state">
        <p>There’s nothing here just yet. Check back soon.</p>
      </div>
    );
  return null;
}
