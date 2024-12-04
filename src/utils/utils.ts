export var sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true
        }
      }
    ]
  };


export const getDiscountPersontage = (cPrice:number, dPrice:number) => {
  let discountPercentage = ((dPrice - cPrice) / dPrice) * 100;
  return discountPercentage
}