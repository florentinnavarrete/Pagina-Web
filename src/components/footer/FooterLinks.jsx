/**
 * Colección de elementos de enlace social o de contacto del footer.
 *
 * @param children elementos tipo FooterLink. No se pasan como parámetros.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterLinks({ children }) {
    return (
        <div className="footer-container">
            {children}
        </div>
    )
}

export default FooterLinks;