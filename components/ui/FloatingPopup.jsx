import { useState, useRef } from "react";
import { useFloating, shift, offset, flip } from "@floating-ui/react";

const FloatingPopup = ({ children, referenceElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "top",
    middleware: [offset(10), flip(), shift()],
  });

  return (
    <>
      <div
        ref={refs.setReference}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        {referenceElement}
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default FloatingPopup;
