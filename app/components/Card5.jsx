  
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const page = () => {
    const items = [
      {
        id: 1,
        image: "/client/cipla.jpeg",
        title: "Cipla Limited",
      },
      {
        id: 2,
        image: "/client/gp.png",
        title: "Glenmark Pharmaceuticals Ltd",
      },
      {
        id: 3,
        image: "/client/vit.jpeg",
        title: "Vitamax Healthcare Pvt Ltd",
      },
      {
        id: 4,
        image: "/client/logo-10.png",
        title: "Sanyog Pharma Consultants Indore Pvt. Ltd",
      },
       
    ];
  
    return (
      <>
   <section className="flex justify-center rounded-2xl items-center bg-gradient-to-br from-gray-100 to-gray-100 text-gray-950">
      <div className="container mx-auto  w-full md:px-6">
        
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
          {items.map(({ id, image, title},index ) => (
            <SwiperSlide key={index}>
            <div
              key={id}
              className="relative bg-white/10 backdrop-blur-lg border border-gray-300  rounded-xl p-6 transition-transform transform hover:translate-y-[-5px]"
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
  
  export default page;
  