import { useEffect, useRef, useState } from "react";

/**
 * Tarjetas usadas para describir servicios que se ofrecen.
 *
 * @param iconText Icono de texto que usar en vez de una imagen. Recomendado dos caracteres máximos.
 * @param iconImage Icono en imagen que utilizar en vez de texto. Para poder utilizarlo, no hay que indicar un iconText, o dejarlo vacío.
 * @param backgroundImg Imagen que utilizar de fondo para la tarjeta.
 * @param title Título de la tarjeta.
 * @param text Texto de la tarjeta.
 * @returns {React.JSX.Element}
 * @constructor
 */
function AboutUsCard({ iconText, iconImage, backgroundImg, title, text }) {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // useEffect para hacer una animación de aparición una vez se ve
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (iconText === '' || iconText === undefined) {
        return (
            <div ref={cardRef}
                 className={`about-us-card${visible ? " card-visible" : ""}`}>
                <div className="card-imgs">
                    <img className="card-img" src={backgroundImg}/>
                    <div className="card-icon-container">
                        <img className="card-icon-img" src={iconImage}/>
                    </div>
                </div>
                <div className="card-text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div ref={cardRef}
                 className={`about-us-card${visible ? " card-visible" : ""}`}>
                <div className="card-imgs">
                    <img className="card-img" src={backgroundImg}/>
                    <div className="card-icon-container">
                        <h4 className="card-icon">{iconText}</h4>
                    </div>
                </div>
                <div className="card-text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}

export default AboutUsCard;