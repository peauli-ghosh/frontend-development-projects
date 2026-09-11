function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section-container">
        <div className="contact-card">
          <div className="contact-content">
            <span className="section-label">GET IN TOUCH</span>

            <h2>
              Let's build something <span>useful.</span>
            </h2>

            <p>
              I'm always interested in learning, building new projects, and
              connecting with people who enjoy creating practical solutions.
            </p>

            <a
              href="mailto:peaulighosh2272@gmail.com"
              className="btn btn-primary contact-button"
            >
              Email Me <span>↗</span>
            </a>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">@</span>

              <div>
                <span>Email</span>
                <a href="mailto:peaulighosh2272@gmail.com">
                  peaulighosh2272@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">⌖</span>

              <div>
                <span>Location</span>
                <p>Howrah, West Bengal, India</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">in</span>

              <div>
                <span>LinkedIn</span>
                <a href="#" target="_blank" rel="noreferrer">
                  Peauli Ghosh
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">&lt;/&gt;</span>

              <div>
                <span>GitHub</span>
                <a
                  href="https://github.com/peauli-ghosh"
                  target="_blank"
                  rel="noreferrer"
                >
                  peauli-ghosh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;