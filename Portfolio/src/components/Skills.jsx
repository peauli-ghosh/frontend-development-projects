function Skills() {
  const skillGroups = [
    {
      title: "Backend Development",
      icon: "</>",
      skills: [
        "Python",
        "FastAPI",
        "Django (Basics)",
        "SQLAlchemy",
        "RESTful API Design",
      ],
    },
    {
      title: "Frontend Development",
      icon: "◈",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Vite",
        "Responsive Web Design",
      ],
    },
    {
      title: "Database",
      icon: "▣",
      skills: [
        "MySQL",
        "Database Design",
        "SQL Queries",
        "Optimization (Basics)",
      ],
    },
    {
      title: "Data & AI",
      icon: "✦",
      skills: [
        "Machine Learning (Basics)",
        "Data Science Fundamentals",
        "NumPy",
        "TensorFlow (Basics)",
        "NLP (Introductory)",
        "Cloud Computing",
      ],
    },
    {
      title: "Tools & Platforms",
      icon: "⌘",
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
        "MS Office",
        "Canva",
      ],
    },
  ];

  return (
    <section className="skills section" id="skills">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">MY SKILLS</span>
          <h2>Technologies I <span>work with.</span></h2>
          <p>
            A collection of technologies and tools I use while building
            projects and expanding my development skills.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-card" key={group.title}>
              <div className="skill-card-header">
                <span className="skill-icon">{group.icon}</span>
                <h3>{group.title}</h3>
              </div>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;