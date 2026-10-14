import { Search } from "lucide-react";

export default function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <Search size={25} />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}