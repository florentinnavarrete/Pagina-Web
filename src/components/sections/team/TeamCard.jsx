import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

/**
 * Tarjetas usadas para mostrar un miembro del equipo con información de contacto.
 *
 * @param img imagen del miembro del equipo.
 * @param name nombre del miembro del equipo.
 * @param description descripción corta del miembro del equipo.
 * @param linkedin URL del LinkedIn del miembro. URL de OKSAP por defecto.
 * @param mail correo electrónico del miembro. Correo de OKSAP por defecto.
 * @returns {React.JSX.Element}
 * @constructor
 */
function TeamCard({
                      img,
                      name,
                      description,
                      linkedin = "https://www.linkedin.com/company/oksap-spain/",
                      mail = "info@oksap.es"
}) {
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

    return (
        <div ref={cardRef}
             className={`team-card${visible ? " card-visible" : ""}`}>
            <img src={img} alt=""/>
            <div className="team-card-content">
                <h4>{name}</h4>
                <h6>{description}</h6>

                <div className="team-links">
                    <a href={linkedin} target="_blank">
                        <FaLinkedinIn className="icon" />
                    </a>
                    <a href={`mailto:${mail}`}>
                        <FaEnvelope className="icon" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TeamCard;