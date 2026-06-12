import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              <span className="first-name">ABHISHEK</span>
              <span className="last-name">MATHUR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full Stack Developer</h3>
            <div className="landing-cycle-slot">
              <span className="cycle-word">FastAPI</span>
              <span className="cycle-word">Next.js</span>
              <span className="cycle-word">Python</span>
              <span className="cycle-word">SQL</span>
              <span className="cycle-word">FastAPI</span>
              <span className="cycle-word">Next.js</span>
              <span className="cycle-word">Python</span>
              <span className="cycle-word">SQL</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
