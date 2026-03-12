import Servicios from "./Servicios.jsx";
import ServiciosElement from "./ServiciosElement.jsx";

/**
 * Sección de Servicios.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
function ServiciosSection() {
    return (
        <section id="seccion-servicios">
            <Servicios>
                <ServiciosElement
                    shade={0}
                    icon={"/src/img/icons/ico_mission.png"}
                    alt={"Mission icon"}
                    title={"Mission"}
                    text={"To be the preferred destination for professionals seeking continuous growing within the SAP HR technologies to provide additional value to our clients."}
                />

                <ServiciosElement
                    shade={1}
                    icon={"/src/img/icons/ico_vision.png"}
                    alt={"Vision icon"}
                    title={"Vision"}
                    text={"To build exceptional teams and enhance their performance in SAP consulting, constantly raising their level of expertise."}
                />

                <ServiciosElement
                    shade={0}
                    icon={"/src/img/icons/ico_values.png"}
                    alt={"Values icon"}
                    title={"Values"}
                    text={"Specializing in SAP HR solutions with senior expertise in Spanish legal requirements."}
                />
            </Servicios>
        </section>
    )
}

export default ServiciosSection;