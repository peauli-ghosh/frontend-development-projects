function Education() {
  const education = [
    {
      period: "2023 — 2027",
      degree: "BCA (Hons.)",
      institution: "Techno India University, Kolkata",
      description:
        "Focused on programming, web technologies, and computer science fundamentals.",
      current: true,
    },
    {
      period: "2023",
      degree: "Higher Secondary (12th)",
      institution: "Sakhawat Memorial Govt. Girls' High School",
      description: "WBCHSE Board · Humanities Stream · Grade A",
      current: false,
    },
    {
      period: "2021",
      degree: "Secondary (10th)",
      institution: "Sakhawat Memorial Govt. Girls' High School",
      description: "WBBSE Board · Grade A",
      current: false,
    },
  ];

  return (
    <section className="education section" id="education">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">EDUCATION</span>
          <h2>My academic <span>journey.</span></h2>
        </div>

        <div className="education-timeline">
          {education.map((item, index) => (
            <div className="education-item" key={item.degree}>
              <div className="education-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="education-content">
                <span className="education-period">{item.period}</span>

                <h3>{item.degree}</h3>

                <h4>{item.institution}</h4>

                <p>{item.description}</p>

                {item.current && (
                  <span className="current-badge">Currently Pursuing</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;