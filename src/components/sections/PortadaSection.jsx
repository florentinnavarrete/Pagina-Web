/**
 * Sección de la portada, con el logo, un título y un corto subtítulo.
 *
 * @param title Título a mostrar en la portada.
 * @param subtitle Subtítulo a mostrar.
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function PortadaSection({ title, subtitle }) {
    return (
        <section id="seccion-portada">
            <a href="https://www.instagram.com/oksap.spain/" target="_blank">
                <img id={"img-ia"}
                     src={"/src/img/decoration/ia.png"}
                     alt={"Sandra, Elias y Clara"}/>
            </a>
            <img id={"logo-portada"}
                 src={"/src/img/logos/logo_portada.jpg"}
                 alt={"Logo de OKSAP"}/>
            <h3>{title}</h3>
            <h6>{subtitle}</h6>
        </section>
    )
}