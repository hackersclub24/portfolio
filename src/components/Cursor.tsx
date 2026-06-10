import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const setX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!hover) {
        setX(mousePos.x);
        setY(mousePos.y);
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          //   cursor.style.transform = `translate(${rect.left}px,${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
