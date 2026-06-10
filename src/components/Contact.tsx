import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { resume } from "../data/resume";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${resume.email}`} data-cursor="disable">
                {resume.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href={`tel:${resume.phone.replace(/[^+\\d]/g, "")}`} data-cursor="disable">
                {resume.phone}
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Links</h4>
            <a
              href="https://github.com/hackersclub24/fastapi"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub Project <MdArrowOutward />
            </a>
            <a
              href="https://www.skill-street.in/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Skill Street <MdArrowOutward />
            </a>
            <a
              href="https://fastapi-3i61.onrender.com/docs"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Live API Docs <MdArrowOutward />
            </a>
            <a
              href="#about"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Resume Profile <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Abhishek Mathur</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
