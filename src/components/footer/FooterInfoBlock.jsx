/**
 * Colección de elementos de información del footer.
 *
 * @param children elementos tipo FooterInfo. No se pasan como parámetros.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterInfoBlock({ children }) {
    return (
        <div className="footer-container">
            <hr/>
            {children}
        </div>
    )
}

export default FooterInfoBlock;