// src/components/CheckboxLabel.jsx
import React from "react";
import { Checkbox } from "@material-tailwind/react";

const CheckboxLabel = ({
  label = "Default Label",
  checked,
  onChange,
  ...props
}) => {
  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={(e) => onChange && onChange(e)}
      {...props}
    />
  );
};

export default CheckboxLabel;
