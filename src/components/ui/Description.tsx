import React, { useState } from "react";

interface DescriptionProps {
  description: string;
  maxLines?: number;
  className?: string;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  maxLines = 5,
  className,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = (e: { stopPropagation: () => void }) => {
    setShowFullDescription(!showFullDescription);
    e.stopPropagation();
  };

  const renderDescription = () => {
    const lines = description?.split("\n");
    if (!showFullDescription && lines?.length > maxLines) {
      // If description exceeds maximum lines and full description is not shown
      return (
        <>
          {lines?.slice(0, maxLines)?.join("\n")}
          <span
            className="text-primary underline cursor-pointer hover:no-underline"
            onClick={toggleDescription}
          >
            {" See More"}
          </span>
        </>
      );
    } else {
      // If description is within maximum lines or full description is shown
      return (
        <>
          {description}
          {showFullDescription && (
            <span
              className="text-primary underline cursor-pointer hover:no-underline"
              onClick={toggleDescription}
            >
              {" See Less"}
            </span>
          )}
        </>
      );
    }
  };

  return <p className={`${className}`}>{renderDescription()}</p>;
};

export default Description;
