import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function Textarea({ className = "", ...rest }: TextareaProps) {
  const classes = ["textarea", className].filter(Boolean).join(" ");
  return <textarea className={classes} {...rest} />;
}

export default Textarea;
