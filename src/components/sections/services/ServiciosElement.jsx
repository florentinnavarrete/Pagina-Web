import { useEffect, useRef, useState } from "react";

/**
 * Elemento utilizado para indicar servicios básicos.
 *
 * @param shade 1 si se quiere que tenga un ligero gradiente central, 0 si no.
 * @param icon Icono a mostrar.
 * @param alt Texto alt para el icono.
 * @param title Título del servicio.
 * @param text Texto del servicio.
 * @returns {React.JSX.Element}
 * @constructor
 */
function ServiciosElement({ shade, icon, alt, title, text }) {

    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    // useEffect para hacer una animación de aparición una vez se ve
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.3 // se muestra cuando el 30% es visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${shade === 1 ? "elem-servicios-shade" : "elem-servicios"} ${visible ? "elem-visible" : ""}`}>
            <img src={icon} alt={alt}/>
            <h4>{title}</h4>
            <hr/>
            <p>{text}</p>
        </div>
    )
}

export default ServiciosElement;