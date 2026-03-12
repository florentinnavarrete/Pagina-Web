/**
 * Elemento que representa el nombre de la compañía en el footer.
 *
 * @param company nombre de la compañía a mostrar.
 * @returns {React.JSX.Element}
 * @constructor
 */
function FooterCompany({ company }) {
    return (
        <div className="company-container">
            <div className="grey-wall"/>
            <h2>{company}</h2>
        </div>
    )
}

export default FooterCompany;