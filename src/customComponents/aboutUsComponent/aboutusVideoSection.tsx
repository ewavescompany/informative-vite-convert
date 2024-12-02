import SlideComponent from "../reavelAnimation/slideComponent";

function AboutusVideoSection({
  header,
  sub_header,
  description,
}: {
  header: string;
  sub_header: string;
  description: string | undefined;
}) {
  return (
    <div className="w-full h-[350px] md:h-[500px] px-5 relative flex flex-col items-center justify-center gap-3">
      <video
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[1]"
        loop
        muted
        autoPlay
        playsInline
        src="/aboutus/aboutUsVideo.mp4" // Use relative URL path
      >
        Your browser does not support the video tag
      </video>
      <div className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[2] bg-grayblack/80"></div>
      <div className="capitalize flex flex-col items-center justify-center gap-3 md:text-3xl lg:text-5xl text-2xl font-semibold text-graywhite z-[3] ">
        <div className="w-full h-full flex flex-row items-center justify-start md:justify-center">
          <SlideComponent dir="down">
            <h1 className="">{header || ""}</h1>
          </SlideComponent>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-start md:justify-center">
          <SlideComponent dir="up">
            <h2 className="">{sub_header || ""}</h2>
          </SlideComponent>
        </div>
      </div>
      <div className="font-medium text-muted z-[3] xl:text-xl md:text-lg text-sm xl:max-w-[1100px] md:max-w-[900px] sm:max-w-[400px] text-center">
        <SlideComponent dir="up">
          <p>{description || ""}</p>
        </SlideComponent>
      </div>
    </div>
  );
}

export default AboutusVideoSection;
