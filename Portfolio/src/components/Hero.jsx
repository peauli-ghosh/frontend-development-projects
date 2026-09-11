import profileImage from "../assets/profile.png";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>

          <img
            src={profileImage}
            alt="Peauli Ghosh"
            className="hero-image"
          />
        </div>

        <div className="hero-content">
          <span className="eyebrow">
            BACKEND DEVELOPER • BCA STUDENT
          </span>

          <h1>
            Hi, I'm <span>Peauli.</span>
            <br />
            I build practical digital solutions.
          </h1>

          <p className="hero-description">
            I'm a backend-focused BCA student who enjoys building reliable
            web applications, REST APIs, and real-world software solutions.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work <span>↗</span>
            </a>

            <a href="#contact" className="btn btn-secondary">
              Get In Touch <span>↗</span>
            </a>
          </div>

          <div className="hero-tech">
            <span>Currently working with</span>

            <div className="tech-list">
              <span>Python</span>
              <span>FastAPI</span>
              <span>React</span>
              <span>MySQL</span>
              <span>Git</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;