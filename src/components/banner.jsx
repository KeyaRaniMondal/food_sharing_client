import banner from "../assets/bannerbg.jpg";
import cupon from "../assets/cupon.jpg";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
        height: "60vh", 
      }}
      className="relative"
    >
      <div className="absolute -bottom-20 left-0 ">
        <img src={cupon} alt="Coupon" className="h-28 md:h-48 lg:h-64" />
      </div>
    </div>
  );
};

export default Banner;

