function Projects() {
  const projects = [
    {
      number: "01",
      title: "StayEase",
      subtitle: "Hotel Booking API",
      description:
        "A RESTful hotel booking API built with FastAPI, featuring authentication, role-based access control, database integration, and search functionality.",
      technologies: ["Python", "FastAPI", "MySQL", "SQLAlchemy", "JWT"],
      type: "Backend Project",
      link: "#",
    },
    {
      number: "02",
      title: "Student Management",
      subtitle: "React Information Portal",
      description:
        "A React-based student information portal designed to organize student records through reusable components and props.",
      technologies: ["React", "JSX", "Props", "CSS"],
      type: "React Project",
      link: "#",
    },
    {
      number: "03",
      title: "Employee Directory",
      subtitle: "Employee Management App",
      description:
        "A responsive employee directory for managing, searching, editing, deleting, and filtering employee information.",
      technologies: ["React", "useState", "Events", "CSS"],
      type: "React Project",
      link: "#",
    },
  ];

  return (
    <section className="projects section" id="projects">
      <div className="section-container">
        <div className="section-heading projects-heading">
          <div>
            <span className="section-label">SELECTED PROJECTS</span>

            <h2>
              Things I've <span>built.</span>
            </h2>

            <p className="projects-description">
              A selection of projects that reflect my interest in backend
              development, web technologies, and practical applications.
            </p>
          </div>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-number">{project.number}</div>

              <div className="project-main">
                <span className="project-type">{project.type}</span>

                <h3>{project.title}</h3>

                <h4>{project.subtitle}</h4>

                <p>{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <a
                href={project.link}
                className="project-link"
                aria-label={`View ${project.title} project`}
              >
                ↗
              </a>
            </article>
          ))}
        </div>

        <p className="projects-note">
          More projects will be added as I continue building and learning.
        </p>
      </div>
    </section>
  );
}

export default Projects;