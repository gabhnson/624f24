import { allSources } from "../prefill/sources";
import type { FormGraph, FormNode } from "../api/useFormGraph";
import type { Field } from "../api/useFormGraph";
import type { PrefillOption } from "../prefill/sources";

interface PrefillModalProps {
  form: FormNode;
  field: Field;
  graph: FormGraph;
  onClose: () => void;
  onSelect: (option: PrefillOption) => void;
}

export function PrefillModal({
  form,
  field,
  graph,
  onClose,
  onSelect,
}: PrefillModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          width: 400,
          maxHeight: "80%",
          overflowY: "auto",
          borderRadius: 8,
        }}
      >
        <h2>Select a Prefill Source</h2>
        <p><strong>Field:</strong> {field.name}</p>

        {allSources.map(source => {
          const options = source.getOptions(form.id, graph);

          return (
            <div key={source.id} style={{ marginBottom: 16 }}>
              <h4>{source.label}</h4>
              {options.length === 0 ? (
                <p style={{ color: "#999" }}>No options</p>
              ) : (
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {options.map(option => (
                    <li
                      key={option.sourceId}
                      onClick={() => onSelect(option)}
                      style={{
                        cursor: "pointer",
                        padding: "4px 6px",
                        background: "#f3f3f3",
                        marginBottom: 4,
                        borderRadius: 4,
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        <button onClick={onClose} style={{ marginTop: 16 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
