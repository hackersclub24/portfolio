import "./styles/About.css";
import { resume } from "../data/resume";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">Profile</h3>
        <p className="para">
          {resume.profile}
        </p>
      </div>
    </div>
  );
};

export default About;
