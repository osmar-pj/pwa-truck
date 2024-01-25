import React, { useRef, useEffect } from "react";
import Layout from "../layout";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { name: "1", href: "/cycle", label: "Recorrido Cancha a Yumpag" },
  { name: "2", href: "/cycle/load", label: "Recorrido Lom" },
  { name: "3", href: "/cycle/tour", label: "Recorrido Tre" },
  { name: "4", href: "/cycle/download", label: "Recorrido EE" },
];

export default function NavLinks({ children }) {
  const pathname = usePathname();
  const currentIndex = links.findIndex((link) => pathname === link.href);

  if (currentIndex === -1) {
    return null;
  }

  const circleElements = links.map((link, index) => {
    const isCurrent = index === currentIndex;
    const isCompleted = index < currentIndex;

    return (
      <React.Fragment key={`progress-${link.name}`}>
        <div
          className={`progress-circle ${isCompleted ? "completed" : ""} ${
            isCurrent ? "current" : ""
          }`}
        >
          {isCompleted && !isCurrent ? "" : link.name}
        </div>
        {index < links.length - 1 && (
          <div
            className={`progress ${isCompleted ? "completed-p" : ""} ${
              isCurrent ? "current-p" : ""
            }`}
          />
        )}
      </React.Fragment>
    );
  });

  const pageMotionProps = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <Layout>
      <section className="w-Home">
        <div className="navbar">
          <aside>{circleElements}</aside>
        </div>
        <AnimatePresence>
          <LazyMotion features={domAnimation}>
            <m.div  className="container" {...pageMotionProps} key={pathname.key}>
              {children}
            </m.div>
          </LazyMotion>
        </AnimatePresence>
      </section>
    </Layout>
  );
}
