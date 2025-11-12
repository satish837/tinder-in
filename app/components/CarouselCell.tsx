import { ReactNode } from "react";

interface CarouselCellProps {
  title: string | ReactNode;
  children: ReactNode;
  className?: string;
}

export default function CarouselCell({ title, children, className = "" }: CarouselCellProps) {
  // Check if title is a string containing HTML
  const isHTMLString = typeof title === 'string' && /<[^>]+>/.test(title);
  
  return (
    <section className={`bg-pinkMain rounded-3xl p-4 md:p-12 ${className}`}>
      <h5 
        className="text-lg md:text-3xl font-extrabold text-white"
        {...(isHTMLString ? { dangerouslySetInnerHTML: { __html: title as string } } : { children: title })}
      />
      {children}
    </section>
  );
}

