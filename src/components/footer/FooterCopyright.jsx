/**
 * Elemento que muestra los derechos de copyright de la empresa.
 *
 * @param text texto a mostrar.
 * @param link URL que acompaña.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterCopyright({ text, link = "#" }) {
    return (
        <div className="footer-copyright">
            <a href={link} target="_blank"><h6>{text}</h6></a>
        </div>
    )
}

export default FooterCopyright;