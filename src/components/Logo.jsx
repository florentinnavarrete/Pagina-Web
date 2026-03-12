/**
 * Logo de la página, en formato pequeño.
 *
 * @param src URL/ubicación del logo.
 * @param alt texto alt.
 * @returns {React.JSX.Element}
 * @constructor
 */
function Logo({ src, alt }) {
    return (
        <img className="logo" src={src} alt={alt}/>
    )
}

export default Logo;