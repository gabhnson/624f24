import { useFormGraph } from "../api/useFormGraph";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FormList({ selectedId, onSelect }: Props) {
  const { data, isLoading, error } = useFormGraph();

  if (isLoading) return <p>Loading forms…</p>;
  if (error) return <p>Error loading form graph.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {Object.values(data!).map((form) => (
        <li
          key={form.id}
          onClick={() => onSelect(form.id)}
          style={{
            cursor: "pointer",
            padding: "4px 8px",
            marginBottom: 2,
            background: form.id === selectedId ? "#cceeff" : "#f7f7f7",
          }}
        >
          {form.title}
        </li>
      ))}
    </ul>
  );
}
