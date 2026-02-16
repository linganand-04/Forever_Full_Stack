import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import { assets } from "../assets/frontend_assets/assets";

function About() {
  return (
    <>
      <div className="text-2xl text-center pt-8  border-t border-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col lg:flex-row gap-16">
        <img
          className="w-full lg:max-w-112.5 md:max-w-100 md:mx-auto"
          src={assets.about_img}
        />

        <div className="flex flex-col justify-center gap-6 text-gray-600 w-full lg:w-2/4">
          <p className="text-base">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p className="text-base">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <p className="text-base font-bold text-black">Our Mission</p>

          <p className="text-base">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-200 md:border-r-0 border-b-0 sm:border-b px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-sm sm:text-base">Quality Assurance:</b>
          <p className=" text-gray-600 text-sm sm:text-base">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border border-gray-200 md:border-r-0 border-b-0 sm:border-b  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-sm sm:text-base">Convenience:</b>
          <p className=" text-gray-600 text-sm sm:text-base">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-sm sm:text-base">Exceptional Customer Service:</b>
          <p className=" text-gray-600 text-sm sm:text-base">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsLetter />
    </>
  );
}

export default About;
