import React from "react";
import { useEffect, useState } from "react";


const delay = 2500;
const slides = [{img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
title:"Gourmet Steak"},{img:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F14%2FJackfruit-Carnitas-Tacos-FT-Recipe-0821.jpg",
title:"Jackfruit Carnitas Tacos"},{img:"https://www.adorama.com/alc/wp-content/uploads/2018/02/BBBURGER8-1024x683-1024x683.jpg",title:"Bob's Famous Burgers"}]


export default function SlideShow() {
    const [index, setIndex] = useState(0)
    const timeoutRef = React.useRef(null)

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => {
            resetTimeout()
        }
    }, [index])

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {slides.map((slide) => (
                    <div
                        className="slide"
                        key={slide.title}
                    >
                        <img src={slide.img}
                            className="home_background"
                        />
                        <div className="home_img_text">
                            <h1>{slide.title}</h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slideshowDots">
                {slides.map((_, indx) => (
                    <div
                        key={indx}
                        className={`slideshowDot${index === indx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(indx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}