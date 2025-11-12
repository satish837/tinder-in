"use client";

import { useEffect, useRef, ReactNode } from "react";

export interface CarouselItem {
  id?: string | number;
  [key: string]: any;
}

interface DynamicCarouselProps {
  items: ReactNode[] | CarouselItem[];
  renderItem?: (item: CarouselItem, index: number) => ReactNode;
  cellWidth?: string;
  autoPlay?: boolean | number;
  autoPlayDelay?: number;
  pageDots?: boolean;
  prevNextButtons?: boolean;
  draggable?: boolean;
  className?: string;
  cellClassName?: string;
  wrapAround?: boolean;
  contain?: boolean;
}

export default function DynamicCarousel({
  items,
  renderItem,
  cellWidth = "100%",
  autoPlay = true,
  autoPlayDelay = 3000,
  pageDots = false,
  prevNextButtons = false,
  draggable = true,
  className = "",
  cellClassName = "",
  wrapAround = false,
  contain = false,
}: DynamicCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const flickityInstance = useRef<any>(null);

  useEffect(() => {
    // Only import and initialize Flickity on the client side
    if (typeof window === "undefined") return;

    const initFlickity = async () => {
      const Flickity = (await import("flickity")).default;
      await import("flickity/css/flickity.css");

      if (carouselRef.current && !flickityInstance.current) {
        flickityInstance.current = new Flickity(carouselRef.current, {
          cellAlign: "left",
          contain,
          pageDots,
          prevNextButtons,
          wrapAround,
          autoPlay: typeof autoPlay === "boolean" ? (autoPlay ? autoPlayDelay : false) : autoPlay,
          draggable,
          adaptiveHeight: true,
          accessibility: true,
          groupCells: false,
          freeScroll: false,
          percentPosition: false,
        });
      }
    };

    initFlickity();

    return () => {
      if (flickityInstance.current) {
        flickityInstance.current.destroy();
        flickityInstance.current = null;
      }
    };
  }, [autoPlay, autoPlayDelay, pageDots, prevNextButtons, draggable, wrapAround, contain]);

  // Reinitialize when items change
  useEffect(() => {
    if (flickityInstance.current && carouselRef.current) {
      flickityInstance.current.reloadCells();
    }
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-visible px-6 ${className}`}>
      <div ref={carouselRef} className="carousel">
        {items.map((item, index) => {
          const key = (item as CarouselItem)?.id || index;
          // If renderItem is provided, treat items as data objects, otherwise as ReactNode
          const content = renderItem 
            ? renderItem(item as CarouselItem, index)
            : (item as ReactNode);

          return (
            <div 
              key={key} 
              className={`carousel-cell ${cellClassName}`} 
              style={{ width: cellWidth }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

