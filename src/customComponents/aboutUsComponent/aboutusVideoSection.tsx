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
    <div className="w-full h-[50vh] relative flex flex-col items-center justify-center gap-3">
      <video
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[1]"
        loop
        muted
        autoPlay
        src="/aboutus/aboutUsVideo.mp4" // Use relative URL path
      />
      <div className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[2] bg-grayblack/80"></div>
      <h1 className="w-fit h-fit capitalize flex flex-col items-center justify-center gap-3 md:text-3xl lg:text-5xl text-2xl font-semibold text-graywhite z-[3] ">
        <div className="w-full h-full flex flex-row items-center justify-center">
          <SlideComponent dir="down">
            <span className="">{header || ""}</span>
          </SlideComponent>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden">
          <SlideComponent dir="up">
            <span className="">{sub_header || ""}</span>
          </SlideComponent>
        </div>
      </h1>
      <p className="font-medium text-graywhite z-[3] xl:text-lg md:text-base text-sm xl:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] text-center">
        {description || ""}
      </p>
    </div>
  );
}

export default AboutusVideoSection;
