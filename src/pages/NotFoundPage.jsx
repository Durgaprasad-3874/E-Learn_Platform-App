import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div>🧭</div>
      <h1>Looks like you're off course</h1>
      <p>Let's get you back to something worth learning.</p>
      <Link to="/" className="btn btn-primary">
        Back to home <ArrowRight size={16} />
      </Link>
    </div>
  );
}