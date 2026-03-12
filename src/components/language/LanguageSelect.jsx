/**
 * Elemento tipo Dropdown List para seleccionar uno de varios idiomas.
 *
 * @param children Elementos tipo LanguageOption. No se pasan como parámetro.
 * @param title Título del DDL.
 * @returns {React.JSX.Element}
 * @constructor
 */
function LanguageSelect({ children, title }) {
    return (
        <div className="language-ddl">
            <button className="lang-ddl-btn">
                {title}⯆
            </button>

            <div className="lang-ddl-content">
                {children}
            </div>
        </div>
    )
}

export default LanguageSelect;