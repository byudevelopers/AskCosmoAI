import "./FeatureHighlights.css";

const features = [
  {
    title: "Conversational support",
    description:
      "Get clear, contextual answers for admissions, classes, and campus life in seconds.",
  },
  {
    title: "Realtime knowledge base",
    description:
      "Grounded responses backed by curated university resources—always up to date.",
  },
  {
    title: "Shared workspaces",
    description:
      "Bring classmates and advisors into the same conversation with secure access controls.",
  },
];

function FeatureHighlights() {
  return (
    <section
      className="feature-highlights"
      aria-labelledby="feature-highlights-heading"
      id="features"
    >
      <div className="feature-highlights__intro">
        <h2 id="feature-highlights-heading">Made for curious minds</h2>
        <p>
          AskCosmo AI pairs natural conversation with institutional knowledge so
          your community can focus on learning, not searching.
        </p>
      </div>
      <div className="feature-highlights__grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-highlights__card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureHighlights;
