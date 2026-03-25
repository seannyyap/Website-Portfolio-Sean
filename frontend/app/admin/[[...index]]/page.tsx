import { NextStudio } from "next-sanity/studio";

/**
 * Sanity Studio at /admin.
 * All routes under /admin are handled by this catch-all so the Studio can manage its own navigation.
 */
export default async function AdminPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Sanity Studio not configured</h1>
        <p style={{ marginTop: 10, lineHeight: 1.5 }}>
          Create <code>.env.local</code> in <code>frontend</code> and set:
        </p>
        <pre
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.03)",
            overflowX: "auto",
          }}
        >
          NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id{"\n"}
          NEXT_PUBLIC_SANITY_DATASET=production
        </pre>
        <p style={{ marginTop: 10, lineHeight: 1.5 }}>
          Then restart <code>npm run dev</code> and reload <code>/admin</code>.
        </p>
      </div>
    );
  }

  const { default: config } = await import("@/sanity.config");
  return <NextStudio config={config} />;
}
