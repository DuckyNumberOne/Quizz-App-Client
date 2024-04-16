import React from "react";

interface PropsButtons {
  className?: string;
  content?: string;
  onClick?: () => void;
}

const ButtonDefault: React.FC<PropsButtons> = ({
  className,
  content,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
};
export default ButtonDefault;
