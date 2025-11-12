import Image from "next/image";

interface InfoCardProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

export default function InfoCard({
  title,
  subtitle,
  image,
  reverse = false,
}: InfoCardProps) {
  return (
    <article className="w-full mx-auto overflow-visible">
      <div
        className={`bg-white h-full rounded-xl border border-[#bd084d] border-2 shadow-lg px-6 md:px-8 flex flex-col md:flex-row items-center gap-6 overflow-visible ${
          reverse ? "md:flex-row-reverse min-h-[420px] no-scale-image" : " min-h-[380px] scale-image justify-end"
        }`}
        style={{
          boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="flex-1 relative flex items-end justify-center overflow-visible" style={{ minHeight: '300px', height: '100%' }}>
          <div className="relative w-full overflow-visible" style={{ height: '480px', marginTop: '-100px' }}>
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-contain" 
              style={{ 
                objectPosition: 'bottom',
                transformOrigin: 'bottom center'
              }} 
            />
          </div>
        </div>
        <div className="flex-1 text-left flex items-center cont flex-col">
          <h3 
            className="text-2xl md:text-6xl font-extrabold text-pinkLight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p 
            className="mt-2 text-pinkLight text-2xl"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
         
        </div>
      </div>
    </article>
  );
}
