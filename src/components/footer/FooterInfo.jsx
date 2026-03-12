import { MdKeyboardArrowRight } from "react-icons/md";

/**
 * Elemento que representa una línea de información dentro de un bloque de información.
 * Solamente se debe usar uno o ninguno de los dos parámetros opcionales: link y mail.
 *
 * @param text texto a mostrar en la línea.
 * @param link URL a la que enlazar a través del texto. Opcional.
 * @param mail correo electrónico al que enviar un correo a través del texto. Opcional.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterInfo({ text, link, mail }) {
    if (link || link !== undefined) {
        return (
            <div className="footer-block">
                            <span className="info">
                                <MdKeyboardArrowRight className="block-arrow" />
                                <a href={link} target="_blank">{text}</a>
                            </span>
                <hr />
            </div>
        )
    } else if (mail || mail !== undefined) {
        return (
            <div className="footer-block">
                            <span className="info">
                                <MdKeyboardArrowRight className="block-arrow" />
                                <a href={`mailto:${mail}`}>{text}</a>
                            </span>
                <hr />
            </div>
        )
    } else {
        return (
            <div className="footer-block">
                            <span className="info">
                                <MdKeyboardArrowRight className="block-arrow" />
                                <p>{text}</p>
                            </span>
                <hr />
            </div>
        )
    }
}

export default FooterInfo;