import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slideshow.css"; // ✅ Ensure CSS file is correctly linked

const Slideshow = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjAt7yvGlxRgHOtxvyMQapGmsWYHIl-QEaQ&s",
    "https://www.financialexpress.com/wp-content/uploads/2025/03/IPL-2025-Captains.png?w=1024",
    "https://cdn.prod.website-files.com/619cb1d12095e3f3cdddaeb2/664da4fbf02ac45ccb4d4ce8_IPL%20Owners%20list.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    arrows: true, // ✅ Enables navigation arrows
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
