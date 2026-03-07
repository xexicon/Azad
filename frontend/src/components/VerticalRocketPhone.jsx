import RocketFull from "../assets/RocketSekl.svg";

export default function VerticalRocketPhone() {
  return (
    <div className="w-full max-w-[92px] sm:max-w-[120px] h-[460px] sm:h-[580px] lg:h-[680px] bg-black flex items-start justify-center overflow-hidden">
      <img
        src={RocketFull}
        alt="Rocket outline"
        className="h-full w-full object-contain object-top"
      />
    </div>
  );
}
