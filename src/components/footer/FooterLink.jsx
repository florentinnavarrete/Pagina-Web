import { FaBlog, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { AiFillFileUnknown } from "react-icons/ai";

/**
 * Elemento que representa un enlace social o de contacto de la empresa a través de un icono.
 *
 * @param link URL/dirección/correo al que enlazar.
 * @param mail true para mostrar icono de correo electrónico.
 *             Poner un correo en el link al usar este icono.
 * @param blog true para mostrar icono de blog.
 * @param twitter true para mostrar icono de Twitter/X.
 * @param linkedin true para mostrar icono de LinkedIn.
 * @param facebook true para mostrar icono de Facebook.
 * @param instagram true para mostrar icono de Instagram.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterLink({
                              link = "#",
                              mail = false,
                              blog = false,
                              twitter = false,
                              linkedin = false,
                              facebook = false,
                              instagram = false,
}) {
    if (mail) {
        return (
            <a href={`mailto:${link}`} target="_blank">
                <FaEnvelope className="icon" />
            </a>
        )
    } else if (blog) {
        return (
            <a href={link} target="_blank">
                <FaBlog className="icon" />
            </a>
        )
    } else if (twitter) {
        return (
            <a href={link} target="_blank">
                <FaSquareXTwitter className="icon" />
            </a>
        )
    } else if (linkedin) {
        return (
            <a href={link} target="_blank">
                <FaLinkedin className="icon" />
            </a>
        )
    } else if (facebook) {
        return (
            <a href={link} target="_blank">
                <FaFacebookSquare className="icon" />
            </a>
        )
    } else if (instagram) {
        return (
            <a href={link} target="_blank">
                <FaInstagram className="icon" />
            </a>
        )
    } else {
        return (
            <a href={link} target="_blank">
                <AiFillFileUnknown className="icon" />
            </a>
        )
    }
}

export default FooterLink;