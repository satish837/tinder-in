"use client";

import Image from "next/image";
import React, { ReactNode } from "react";

interface InfoCardProps {
  id?: string;
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
  onActivate?: (id?: string) => void;
  selected?: boolean;
  content?: ReactNode;
  onClose?: () => void;
}

export default function InfoCard({
  id,
  title,
  subtitle,
  image,
  reverse = false,
  onActivate,
  selected = false,
  content,
  onClose,
}: InfoCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Card clicked, id:', id, 'onActivate exists:', !!onActivate);
    if (onActivate && id) {
      onActivate(id);
    }
  };

  // Debug: Log when selected changes
  React.useEffect(() => {
    if (id === 'emotional') {
      console.log('Emotional GPS card - selected:', selected, 'content:', !!content);
    }
  }, [selected, content, id]);

  return (
    <article id={id ? `card-${id}` : undefined} className="w-full mx-auto overflow-visible">
      <div
        className={`bg-white relative h-full rounded-xl border border-[#bd084d] border-2 shadow-lg ${
          selected ? 'ring-2 ring-pinkMain' : ''
        }`}
        style={{
          boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Card Header - Clickable area */}
        <div
          role={onActivate ? "button" : undefined}
          tabIndex={onActivate ? 0 : undefined}
          aria-pressed={onActivate ? selected : undefined}
          onClick={onActivate ? handleClick : undefined}
          onKeyDown={onActivate ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e as any); } } : undefined}
          className={`px-4 md:px-6 lg:px-8 pt-6 md:py-0 flex flex-col md:flex-row items-center gap-4 md:gap-6 overflow-visible ${
            reverse
              ? "md:flex-col-reverse min-h-[280px] md:min-h-[420px] no-scale-image"
              : "min-h-[280px] md:min-h-[380px] scale-image justify-end"
          }`}
          style={{
            cursor: onActivate ? 'pointer' : undefined,
          }}
        >
          <div className={`flex-1 w-full relative flex items-end justify-center overflow-visible min-h-[200px] md:min-h-[300px] h-full order-2 ${
            reverse ? 'md:order-2' : 'md:order-1'
          }`} style={{ alignSelf: 'flex-end' }}>
            <div className="relative w-full overflow-visible h-[200px] md:h-[480px] -mt-[60px] md:-mt-[100px] pointer-events-none">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain pointer-events-none"
                style={{ objectPosition: 'bottom', transformOrigin: 'bottom center' }}
              />
            </div>
          </div>

          <div className={`flex-1 text-left flex items-center cont flex-col w-full md:w-auto order-1 ${
            reverse ? 'md:order-1' : 'md:order-2'
          }`}>
            <h3 className="text-3xl md:text-2xl lg:text-6xl font-extrabold text-pinkLight" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="mt-2 text-pinkLight text-base md:text-xl lg:text-2xl" dangerouslySetInnerHTML={{ __html: subtitle }} />

            {/* caret */}
            {onActivate && (
              <span className={`mt-4 mb-2 self-start inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#bd084d]`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${selected ? 'rotate-180' : 'rotate-0'}`}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Expandable Content Panel - Inside the card */}
        {content && (
          <div
            id={`details-${id}`}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: selected ? '5000px' : '0px',
              opacity: selected ? 1 : 0,
            }}
            aria-hidden={!selected}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-6 md:pb-8 ">
              <div className="bg-white/70 shadow-card border-t-2 border-[#bd084d] py-4 md:py-0 lg:py-0">
                {content}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
