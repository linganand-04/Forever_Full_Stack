import { assets } from "../assets/frontend_assets/assets";

function Hero() {
  return (
    <>
      <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
              <p className="uppercase font-medium text-sm md:text-base">
                Our Bestsellers
              </p>
            </div>
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="uppercase font-semibold text-sm md:text-base">
                Shop Now
              </p>
              <p className="w-8 md:w-11 h-px bg-[#414141]"></p>
              
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <div className="w-full sm:w-1/2">
          <img src={assets.hero_img} alt="" />
        </div>
      </div>
    </>
  );
}

export default Hero;
