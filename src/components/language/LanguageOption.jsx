/**
 * Elemento que representa una opción en el DDL de idiomas.
 *
 * @param language Nombre del idioma, en su idioma original.
 * @param src URL/ubicación de la imagen de la bandera.
 * @param alt Texto alt.
 * @returns {React.JSX.Element}
 * @constructor
 */
function LanguageOption({ language, src, alt }) {
    return (
        <a href="#">
            <img src={src} alt={alt}
                 width="20" height="20"/> {language}</a>
    )
}

export default LanguageOption;