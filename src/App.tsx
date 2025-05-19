import { useState, useReducer } from "react";
import { FormList } from "./components/FormList";
import { useFormGraph } from "./api/useFormGraph";
import { prefillReducer } from "./state/prefillReducer";
import type { PrefillMapping } from "./state/prefillReducer";


// Inline PrefillTable for now
function PrefillTable({
  formId,
  mapping,
  onClear,
}: {
  formId: string;
  mapping: PrefillMapping;
  onClear: (fieldId: string) => void;
}) {
  const { data } = useFormGraph();
  const form = data?.[formId];
  if (!form) return <p>Form not found.</p>;

  return (
    <div>
      <h3>Fields for {form.title}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Prefill Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {form.fields.map((field) => (
            <tr key={field.id}>
              <td>{field.name}</td>
              <td>{mapping[field.id] || "—"}</td>
              <td>
                {mapping[field.id] && (
                  <button onClick={() => onClear(field.id)}>❌</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [mapping, dispatch] = useReducer(prefillReducer, {});

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      {/* Left: Form List */}
      <div style={{ width: "300px" }}>
        <h2>Forms</h2>
        <FormList selectedId={selectedFormId} onSelect={setSelectedFormId} />
      </div>

      {/* Right: Prefill Table */}
      <div style={{ flex: 1 }}>
        {selectedFormId ? (
          <PrefillTable
            formId={selectedFormId}
            mapping={mapping}
            onClear={(fieldId) =>
              dispatch({ type: "clear", fieldId: fieldId })
            }
          />
        ) : (
          <p>Select a form to begin</p>
        )}
      </div>
    </div>
  );
}

export default App;
