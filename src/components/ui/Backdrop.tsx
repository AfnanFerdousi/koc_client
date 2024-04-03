import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const Backdrop: React.FC<IProps> = ({ children, className = "", onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (onClose && !target.closest(".modal")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames(
        `fixed ${className} top-0 left-0 w-full h-full z-[10000] bg-[#667866b2] flex justify-center items-center`
      )}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
