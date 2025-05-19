import type { FormGraph } from "../api/useFormGraph";

// DFS to get all transitive dependencies of a form
export function getTransitiveDeps(
  formId: string,
  graph: FormGraph,
  visited = new Set<string>()
): string[] {
  if (visited.has(formId)) return [];
  visited.add(formId);

  const form = graph[formId];
  if (!form) return [];

  return form.upstreamIds.flatMap(id => [
    id,
    ...getTransitiveDeps(id, graph, visited),
  ]);
}
