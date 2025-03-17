;import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const page1 = () => {
  const items = [
    {
      id: 1,
      image: "/client/hdfc.png",
      title: "HDFC Life",
    },
    {
      id: 2,
      image: "/client/Pnb.png",
      title: "PNB MetLife Insurance Co. Ltd.",
    },
    {
      id: 3,
      image: "/client/Kotak.png",
      title: "Kotak Life Insurance Co. Ltd.",
    },
    {
      id: 4,
      image: "/client/MaxLife.png",
      title: "Max Life Insurance Co. India Ltd.",
    },
    {
      id: 5,
      image: "/client/Reliance.png",
      title: "Reliance Nippon Life Insurance Ltd",
    },
    {
      id: 6,
      image: "/client/RelianceG.png",
      title: "Reliance General Insurance Co. Ltd.",
    },
    {
      id: 7,
      image: "/client/Manipal.jpeg",
      title: "ManipalCigna Health Insurance Co.",
    },
    {
      id: 8,
      image: "/client/CanaraH.jpg",
      title: "Canara HSBC Life Insurance",
    },
    {
      id: 9,
      image: "/client/ed.jpg",
      title: "Edelweiss Life Insurance Company Limited",
    },
    {
      id: 10,
      image: "/client/ltf.png",
      title: "L&T Finance",
    },
    {
      id: 11,
      image: "/client/adi.jpeg",
      title: "Aditya Birla sunlife Insurance Company",
    },
    {
      id: 12,
      image: "/client/tata.png",
      title: "Tata Aia Life Insurance Company",
    },
    {
      id: 13,
      image: "/client/sriram.png",
      title: "Shriram life Insurance Company",
    },
  ];
  return (
    <>
      <section className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-100 text-gray-950">
      <div className="container mx-auto md:px-6 ">
        
        <Swiper
          modules={[Pagination, Autoplay]} // Add Autoplay here
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // Delay in milliseconds
            disableOnInteraction: false, // Keep autoplay running even after user interaction
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4"
        >
          {items.map(({ id, image, title}, index ) => (
            <SwiperSlide key={index}>
            <div
              key={id}
              className="relative border bg-white/10 backdrop-blur-lg border-gray-300 rounded-xl p-6 transition-transform transform hover:translate-y-[-5px]"
            >
              <div className="relative z-10">
                <div className="gallery-item-thumbnail-wrap">
                  <img
                    decoding="async"
                    src={image}
                    alt={title}
                    className="w-full h-64 rounded-lg"
                  />
                </div>
                <div className="text-center mt-4">
                  <h5 className="text-lg font-serif font-semibold">{title}</h5>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
    </section>
    </>
  );
};

export default page1;
