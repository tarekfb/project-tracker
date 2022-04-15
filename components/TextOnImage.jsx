import Image from "next/image";

// const flexColTopLeft = "flex flex-col justify-start items-start space-y-2";
// const flexColTopCenter = "flex flex-col justify-center items-start space-y-2";
// const flexColCenter = "flex flex-col justify-center items-center space-y-2";

export const ImageOverlay = ({ src, children, styling, positioning, alt }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-h-screen">
        <Image
          src={src}
          layout="responsive"
          objectFit="contain"
          alt={alt && alt}
        />
      </div>
      <div
        className={`${styling && styling} ${
          positioning && positioning
        } absolute flex flex-col justify-start items-start space-y-2 lg:space-y-5 text-white leading-4`}
      >
        {children && children}
      </div>
    </div>
  );
};
