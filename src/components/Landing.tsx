import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { resume } from "../data/resume";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ABHISHEK
              <br />
              <span>MATHUR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{resume.title}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">FastAPI</div>
              <div className="landing-h2-2">React.js</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Next.js</div>
              <div className="landing-h2-info-1">Python</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
