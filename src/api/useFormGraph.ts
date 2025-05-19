import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// Zod schema
const Field = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});
export type Field = z.infer<typeof Field>;


const Form = z.object({
  id: z.string(),
  title: z.string(),
  fields: z.array(Field),
  upstreamIds: z.array(z.string()),
});
export type Form = z.infer<typeof Form>;


const Graph = z.record(Form);

export type FormGraph = z.infer<typeof Graph>;
export type FormNode = FormGraph[string];

export function useFormGraph() {
  return useQuery({
    queryKey: ["formGraph"],
    queryFn: async () => {
      const res = await fetch("/api/action-blueprint-graph-get");
      if (!res.ok) throw new Error("Failed to fetch form graph");
      const json = await res.json();
      return Graph.parse(json);
    },
  });
}
