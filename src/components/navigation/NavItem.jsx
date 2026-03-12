/**
 * Elemento que representa un enlace para usar en el
 * menú de navegación superior de la página principal.
 *
 * @param link Enlace para el elemento.
 * @param title Nombre del enlace.
 * @returns {React.JSX.Element}
 * @constructor
 */
function NavItem({ link, title }) {
    return (
        <>
            <li className="header-item"><a href={link}>{title}</a></li>
        </>
    )
}

export default NavItem;