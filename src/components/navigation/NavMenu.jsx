/**
 * Menú de navegación superior para la página principal.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
function NavMenu({  children }) {
    return (
        <ul className="header-list">
            {children}
        </ul>
    )
}

export default NavMenu;