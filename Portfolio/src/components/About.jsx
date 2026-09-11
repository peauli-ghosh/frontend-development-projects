function About() {
  return (
    <section className="about section" id="about">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">ABOUT ME</span>
          <h2>A little about <span>what I do.</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="about-intro">
              I'm a BCA (Hons.) student at Techno India University, Kolkata,
              with a strong interest in backend development and web
              technologies.
            </p>

            <p>
              I enjoy building practical applications, designing REST APIs,
              working with databases, and exploring how different technologies
              can come together to solve real-world problems.
            </p>

            <p>
              My current work focuses on Python, FastAPI, databases, and
              React, while I continue learning about cloud computing, data
              science, and machine learning.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <span className="highlight-icon">&lt;/&gt;</span>
              <div>
                <h3>Backend Development</h3>
                <p>APIs, authentication and database-driven applications.</p>
              </div>
            </div>

            <div className="highlight-card">
              <span className="highlight-icon">✦</span>
              <div>
                <h3>Continuous Learning</h3>
                <p>Exploring cloud, data science and emerging technologies.</p>
              </div>
            </div>

            <div className="highlight-card">
              <span className="highlight-icon">↗</span>
              <div>
                <h3>Problem Solving</h3>
                <p>Turning ideas into practical and usable solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;