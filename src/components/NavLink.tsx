import {
  NavLink as RouterNavLink,
  NavLinkProps,
} from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ClassValue =
  | string
  | ((state: { isActive: boolean; isPending: boolean }) => string);

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: ClassValue;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName = "text-primary font-semibold",
      pendingClassName = "opacity-70",
      to,
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        aria-current="page"
        className={(state) => {
          const baseClass =
            typeof className === "function"
              ? className(state)
              : className;

          return cn(
            baseClass,
            state.isActive && activeClassName,
            state.isPending && pendingClassName
          );
        }}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };