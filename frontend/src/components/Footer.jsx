import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
  return (
    <>
      <footer className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          <div>
            <img src={assets.logo} className="mb-5 w-32" alt="" />
            <p className="w-full md:w-2/3 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1.5 text-gray-600">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About us</NavLink>
              <NavLink to="/">Delivery</NavLink>
              <NavLink to="/">Privacy policy</NavLink>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1.5 text-gray-600">
              <Link
                className="cursor-pointer"
                target="_blank"
                to="https://wa.me/918778969908"
              >
                8778969908
              </Link>
              <Link
                className="cursor-pointer"
                target="_blank"
                to="https://mailto:linganandb2004@gmail.com"
              >
                linganandb2004@gmail.com
              </Link>
              <Link
                className="cursor-pointer"
                target="_blank"
                to="https://linkedin.com/in/linganandb/"
              >
                LinkedIn
              </Link>
              <Link
                className="cursor-pointer"
                target="_blank"
                to="https://www.instagram.com/linganand_04/"
              >
                Instagram
              </Link>
            </ul>
          </div>
        </div>

        <div>
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright {new Date().getFullYear()} @linganand - All Right
            Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
