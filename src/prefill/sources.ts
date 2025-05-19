import type { FormGraph } from "../api/useFormGraph";
import { getTransitiveDeps } from "../utils/graph";

// ─────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────

export interface PrefillOption {
  sourceId: string;     // e.g., "FormA.email"
  label: string;        // e.g., "Form A → email"
  valueType: string;    // e.g., "email"
}

export interface PrefillSource {
  id: string;           // unique ID for the source (e.g., "direct", "global")
  label: string;        // display label (e.g., "Global Properties")
  getOptions(formId: string, graph: FormGraph): PrefillOption[];
}

// ─────────────────────────────────────────────────────────
// Direct Dependencies Source
// ─────────────────────────────────────────────────────────

export const directSource: PrefillSource = {
  id: "direct",
  label: "Direct Dependencies",

  getOptions(formId, graph) {
    const form = graph[formId];
    if (!form) return [];

    const upstreamForms = form.upstreamIds.map(id => graph[id]).filter(Boolean);

    return upstreamForms.flatMap(upstream =>
      upstream.fields.map(field => ({
        sourceId: `${upstream.id}.${field.name}`,
        label: `${upstream.title} → ${field.name}`,
        valueType: field.type,
      }))
    );
  },
};

// ─────────────────────────────────────────────────────────
// Transitive Dependencies Source
// ─────────────────────────────────────────────────────────

export const transitiveSource: PrefillSource = {
  id: "transitive",
  label: "Transitive Dependencies",

  getOptions(formId, graph) {
    const transitiveIds = getTransitiveDeps(formId, graph);

    return transitiveIds.flatMap(id => {
      const form = graph[id];
      if (!form) return [];
      return form.fields.map(field => ({
        sourceId: `${id}.${field.name}`,
        label: `${form.title} → ${field.name}`,
        valueType: field.type,
      }));
    });
  },
};

// ─────────────────────────────────────────────────────────
// Global Properties Source (mocked)
// ─────────────────────────────────────────────────────────

export const globalSource: PrefillSource = {
  id: "global",
  label: "Global Properties",

  getOptions() {
    return [
      {
        sourceId: "global.account_email",
        label: "Account Email",
        valueType: "email",
      },
      {
        sourceId: "global.org_name",
        label: "Organization Name",
        valueType: "text",
      },
    ];
  },
};

// ─────────────────────────────────────────────────────────
// Export all sources
// ─────────────────────────────────────────────────────────

export const allSources: PrefillSource[] = [
  directSource,
  transitiveSource,
  globalSource,
];
