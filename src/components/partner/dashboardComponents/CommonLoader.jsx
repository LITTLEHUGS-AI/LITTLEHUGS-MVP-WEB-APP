import React from "react";
import { Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const CommonLoader = ({
  loading,
  children,
  style,
  type = "primary",
  disabled,
  onClick,
  ...props
}) => (
  <Button
    type={type}
    style={style}
    disabled={disabled || loading}
    onClick={onClick}
    {...props}
  >
    {loading ? (
      <span className="flex items-center gap-2 justify-center">
        <Spin indicator={<LoadingOutlined spin />} size="small" />
        {children}
      </span>
    ) : (
      children
    )}
  </Button>
);

export default CommonLoader;
