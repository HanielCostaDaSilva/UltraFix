import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardComponent from '../CardComponent';
import './style.css';

function CardCarrousel({ movies, sectionTopic }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: 'progressive',
        swipe: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    function CustomPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-prev-arrow`}
                style={style}
                onClick={onClick}
            >
                &#10094;
            </div>
        );
    }
    
    function CustomNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-next-arrow`}
                style={style}
                onClick={onClick}
            >
                &#10095;
            </div>
        );
    }

    return (
        <section className="carrouselSection">
            <h3 className="sectionTopic"> {sectionTopic} </h3>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className="slide-item">
                        <CardComponent movie={movie} />
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default CardCarrousel;
