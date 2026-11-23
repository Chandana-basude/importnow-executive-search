import { useReveal } from "./Reveal";
import { Children, cloneElement, isValidElement, type ElementType, type ReactElement, type ReactNode } from "react";

/**
 * Headline that reveals word by word when it scrolls into view.
 * Each word is wrapped in .w > .wi with a --i index for the staggered delay (see styles.css).
 * Nested elements such as <span className="grad-text"> keep their styling.
 */
export function SplitText({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const [ref, shown] = useReveal<HTMLElement>();
  let index = 0;

  const split = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .filter(Boolean)
          .map((part, i) =>
            /^\s+$/.test(part) ? (
              " "
            ) : (
              <span className="w" key={i}>
                <span className="wi" style={{ ["--i" as string]: index++ }}>
                  {part}
                </span>
              </span>
            ),
          );
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        return cloneElement(el, undefined, split(el.props.children));
      }
      return child;
    });

  return (
    <Tag ref={ref} className={["split rv", className, shown && "in"].filter(Boolean).join(" ")}>
      {split(children)}
    </Tag>
  );
}
