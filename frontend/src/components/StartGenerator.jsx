import { assets } from "../assets/frontend_assets/assets";

function starGenerator(starData, maxStar = 5, style) {
  let star = +starData;
  let total = +maxStar;
  let subDecimal = total - star;

  if (total < star) return new Error(console.error("Invalid Parameters"))

  // Full Star
  if (total - star === 0) {
    return (
      <>
        {/* {console.log(`Full star: ${total}`)} */}

        {/* Full Star */}
        {Array.from({ length: total }, (_, i) => (
          <img className={style} key={i} src={assets.star_icon} alt="" />
        ))}
      </>
    );
  }

  // Full star, Empty Star
  else if (Number.isInteger(subDecimal)) {
    let remainingStar = total - star;

    return (
      <>
        {/* {console.log(`Full star: ${star}, Empty star: ${remainingStar}`)} */}

        {/* Full Star */}
        {Array.from({ length: star }, (_, i) => (
          <img className={style} key={i} src={assets.star_icon} alt="" />
        ))}

        {/* Half Star */}
        {Array.from({ length: remainingStar }, (_, i) => (
          <img className={style} key={i} src={assets.star_dull_icon} alt="" />
        ))}
      </>
    );
  }

  // Full star, Half star , Empty Star
  else if (total - star !== 0) {
    let floor = Math.floor(star);
    let remainingStar = total - floor;

    return (
      <>
        {/* {console.log(
          `Full star: ${floor}, Half start: 1, Empty star: ${remainingStar - 1}`
        )} */}

        {/* Full Star */}
        {Array.from({ length: floor }, (_, i) => (
          <img className={style} key={i} src={assets.star_icon} alt="" />
        ))}

        {/* Half Star */}
        <img className={style} src={assets.star_half_icon} alt="" />

        {/* Empty Star */}
        {Array.from({ length: remainingStar - 1 }, (_, i) => (
          <img className={style} key={i} src={assets.star_dull_icon} alt="" />
        ))}
      </>
    );
  } else {
    {
      // Empty Star
      Array.from({ length: total }, (_, i) => (
        <img className={style} key={i} src={assets.star_dull_icon} alt="" />
      ));
    }
    // console.log(`Empty Star ${total}`);
  }
}

export default starGenerator;
