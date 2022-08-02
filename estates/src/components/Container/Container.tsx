import { ReactNode } from "react";
import "./style.css";

export interface ContainerProps {
  children?: ReactNode;
}

export function Container(props: ContainerProps) {
  const { children } = props;
  return <div className="container">{children}</div>;
}
