import { assets } from "../assets/frontend_assets/assets";
import PolicyItem from "./PolicyItem";

function OurPolicy() {
  const policy = [
    {
      image: assets.exchange_icon,
      title: "Easy Exchange Policy",
      content: "Exchange eligible products quickly with our hassle-free process.",
    },
    {
      image: assets.quality_icon,
      title: "7 Days Return Policy",
      content: "Shop with confidence using our simple 7-day return policy.",
    },
    {
      image: assets.support_img,
      title: "Best customer support",
      content: "Our support team is always ready to help whenever you need assistance.",
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        {policy.map((item, i) => (
          <PolicyItem
            key={i}
            image={item.image}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </>
  );
}

export default OurPolicy;
