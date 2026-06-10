import "./styles/Career.css";
import { resume } from "../data/resume";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> highlights
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{resume.education.degree}</h4>
                <h5>{resume.education.institute}</h5>
              </div>
              <h3>{resume.education.period}</h3>
            </div>
            <p>
              Relevant Coursework: {resume.education.coursework}
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Focus</h4>
                <h5>FastAPI, React.js, Next.js</h5>
              </div>
              <h3>Current</h3>
            </div>
            <p>
              Building end-to-end web applications with REST APIs, SQL-backed
              data flows, and clean frontend-backend integration.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Finalist</h4>
                <h5>Multiple Events</h5>
              </div>
              <h3>Achievement</h3>
            </div>
            <p>
              Recognized for problem solving, teamwork, and rapid software
              development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
