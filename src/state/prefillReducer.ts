export type PrefillMapping = Record<string, string | null>; // fieldId -> sourceId|null

type Action =
  | { type: "set"; fieldId: string; sourceId: string }
  | { type: "clear"; fieldId: string };

export function prefillReducer(
  state: PrefillMapping,
  action: Action
): PrefillMapping {
  switch (action.type) {
    case "set":
      return { ...state, [action.fieldId]: action.sourceId };
    case "clear":
      return { ...state, [action.fieldId]: null };
    default:
      return state;
  }
}
