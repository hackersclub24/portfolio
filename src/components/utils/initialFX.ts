import { SplitText } from "../../vendor/gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother?.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1 span"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Fade in the cycling words container elegantly
  gsap.fromTo(
    ".landing-cycle-slot",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  CycleWords(".cycle-word");
}

function CycleWords(selector: string) {
  const words = Array.from(
    document.querySelectorAll<HTMLElement>(selector)
  );
  if (words.length < 2) return;

  const HOLD  = 2.5;   // seconds each word is on screen
  const SLIDE = 0.85;  // slide transition duration

  // Position initial state: Word 0 in background, Word 1 in foreground, others hidden below
  gsap.set(words[0], { y: "-35%", color: "#9b66ff", opacity: 0.5, zIndex: 1 });
  gsap.set(words[1], { y: "0%", color: "#ffffff", opacity: 1, zIndex: 2 });
  words.slice(2).forEach((w) =>
    gsap.set(w, { y: "100%", color: "#ffffff", opacity: 0, zIndex: 1 })
  );

  let currentBg = 0;
  let currentFg = 1;

  function next() {
    const oldBgEl = words[currentBg];
    const oldFgEl = words[currentFg];
    const nextFgIdx = (currentFg + 1) % words.length;
    const newFgEl = words[nextFgIdx];

    // Position the incoming word below, transparent, and ready to slide up in front
    gsap.set(newFgEl, { y: "100%", color: "#ffffff", opacity: 0, zIndex: 2 });
    
    // Drop old foreground zIndex to 1 so the new foreground slides up in front of it
    gsap.set(oldFgEl, { zIndex: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset the old background element below the slot for its next turn
        gsap.set(oldBgEl, { y: "100%", opacity: 0, zIndex: 1 });
        
        currentBg = currentFg;
        currentFg = nextFgIdx;
        gsap.delayedCall(HOLD, next);
      },
    });

    // 1. Old background word slides up and out
    tl.to(oldBgEl, {
      y: "-100%",
      opacity: 0,
      duration: SLIDE,
      ease: "power3.inOut",
    }, 0);

    // 2. Old foreground word slides up to background position and fades to purple
    tl.to(oldFgEl, {
      y: "-35%",
      color: "#9b66ff",
      opacity: 0.5,
      duration: SLIDE,
      ease: "power3.inOut",
    }, 0);

    // 3. New foreground word slides up from below to foreground position, bright white
    tl.to(newFgEl, {
      y: "0%",
      opacity: 1,
      duration: SLIDE,
      ease: "power3.inOut",
    }, 0);
  }

  // Start the cycle after the first hold
  gsap.delayedCall(HOLD, next);
}
