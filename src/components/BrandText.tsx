import { Fragment } from "react";
import BrandName from "@/components/BrandName";

/** Renders plain text and replaces every "{brand}" token with the <BrandName /> component. */
export default function BrandText({ children }: { children: string }) {
  const parts = children.split("{brand}");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <BrandName />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
