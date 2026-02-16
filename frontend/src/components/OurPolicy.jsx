import { assets } from "../assets/frontend_assets/assets";
import PolicyItem from "./PolicyItem";

function OurPolicy() {
  const policy = [
    {
      image: assets.exchange_icon,
      title: "Easy Exchange Policy",
      content: "We offer hassle free exchange policy",
    },
    {
      image: assets.quality_icon,
      title: "7 Days Return Policy",
      content: "We provide 7 days free return policy",
    },
    {
      image: assets.support_img,
      title: "Best customer support",
      content: "we provide 24/7 customer support",
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
