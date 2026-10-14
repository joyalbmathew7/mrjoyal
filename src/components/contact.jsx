import { useState } from "react";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // This is a frontend-only form for now.
    // Connect it to your Django backend to send messages.
    alert("Thank you for contacting our church!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <span className="contact-eyebrow">WE ARE HERE FOR YOU</span>
          <h1>Contact Us</h1>
          <p>
            Have a question, prayer request, or need assistance?
            We would be happy to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-container">
        <div className="contact-heading">
          <span>GET IN TOUCH</span>
          <h2>We'd Love to Hear From You</h2>
          <p>
            Reach out to our church for prayer, fellowship,
            church activities, or any other enquiries.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="contact-info-intro">
              Feel free to contact us through any of the
              following channels.
            </p>

            <div className="contact-info-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Church Address</h4>
                <p>St. Stephen's C.S.I. Church</p>
                <p>Puthuval, Kerala, India</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>Contact the church office</p>
                <p>Update with your church phone number</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>Update with your church email address</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">⛪</div>
              <div>
                <h4>Worship & Fellowship</h4>
                <p>Join us in worship, prayer, and fellowship.</p>
              </div>
            </div>

            <div className="contact-social">
              <h4>Stay Connected</h4>
              <p>
                Follow our church website for news,
                events, and announcements.
              </p>
            </div>
          </div>

          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <p>Fill in the form below and share your message.</p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit">
                Send Message <span>→</span>
              </button>
            </form>
          </div>
        </div>

        <section className="contact-map-section">
          <div>
            <span>FIND US</span>
            <h2>Visit Our Church</h2>
            <p>
              We look forward to welcoming you to our church.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=St+Stephen%27s+CSI+Church+Puthuval+Kerala"
            target="_blank"
            rel="noreferrer"
            className="contact-map-link"
          >
            Open Google Maps ↗
          </a>
        </section>
      </section>
    </main>
  );
}

export default Contact;
