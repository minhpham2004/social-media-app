import React from 'react'
import { useSelector } from 'react-redux'

function Carousel({ images, id }) {
    const { theme } = useSelector(state => state)

    const isActive = index => {
        if (index === 0) return "active"
    }

    return (
        <div id={`image${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {
                    images.map((img, index) => (
                        <li
                            data-target={`#image${id}`}
                            data-slide-to={index}
                            className={isActive(index)}
                            key={index}
                        />
                    ))
                }

            </ol>
            <div className="carousel-inner">
                {
                    images.map((img, index) => (
                        <div className={`carousel-item ${isActive(index)}`} key={index}>
                            <img
                                className="d-block w-100" src={img.url} alt={img.url}
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                            />
                        </div>
                    ))
                }
            </div>
            {
                images.length > 1 &&
                <>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </>
            }

        </div>
    )
}

export default Carousel