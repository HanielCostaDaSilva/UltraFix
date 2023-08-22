import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardComponent from '../CardComponent';
import './style.css';

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

function CardCarrousel({ movies, sectionTopic }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: Math.floor(Math.random() *(2000 - 600) + 600),
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



    return (
        <section className="carrouselSection">
        <h3 className="sectionTopic"> {sectionTopic} </h3>
        <Slider {...settings}>
            {movies.map((movie) => (
                <div key={`${movie.id + sectionTopic}`} className="slide-item">
                    <CardComponent movie={movie} />
                </div>
            ))}
        </Slider>
    </section>
    );
}

export default CardCarrousel;
