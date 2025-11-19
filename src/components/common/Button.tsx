import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "danger"
      ? "btn-danger"
      : "btn-primary";

  const classes = ["btn", variantClass, className]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}

export default Button;
