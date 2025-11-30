import React from "react";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  /**
   * Input variant - only outlined is supported for consistency
   */
  variant?: "outlined";
  /**
   * Show password toggle for password fields
   */
  showPasswordToggle?: boolean;
}

/**
 * Reusable Input component wrapping Material-UI TextField
 *
 * Features:
 * - Consistent styling across the app
 * - Password toggle for password fields
 * - Full TextField props support
 * - Default outlined variant
 *
 * @example
 * // Basic input
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 *
 * @example
 * // Password input with toggle
 * <Input
 *   label="Password"
 *   type="password"
 *   showPasswordToggle
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 *
 * @example
 * // Select input
 * <Input
 *   select
 *   label="Status"
 *   value={status}
 *   onChange={(e) => setStatus(e.target.value)}
 * >
 *   <MenuItem value="pending">Pending</MenuItem>
 *   <MenuItem value="completed">Completed</MenuItem>
 * </Input>
 */
export function Input({
  showPasswordToggle,
  type,
  variant = "outlined",
  InputProps,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle password toggle
  const inputType = type === "password" && showPassword ? "text" : type;

  const endAdornment =
    type === "password" && showPasswordToggle ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePassword}
          edge="end"
          size="small"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : (
      InputProps?.endAdornment
    );

  return (
    <TextField
      {...props}
      type={inputType}
      variant={variant}
      InputProps={{
        ...InputProps,
        endAdornment,
      }}
    />
  );
}
