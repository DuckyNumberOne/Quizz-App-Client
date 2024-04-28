import React from "react";
interface PropsLoading {
  className?: string;
  width: string;
  height: string;
  color: string;
}

const DefaultLoading: React.FC<PropsLoading> = ({
  width,
  height,
  color,
  className,
}) => {
  return (
    <span
      className={`loader ${className}`}
      style={{
        width: `${width}`,
        height: `${height}`,
        borderBottomColor: `${color}`,
      }}
    ></span>
  );
};
export default DefaultLoading;
