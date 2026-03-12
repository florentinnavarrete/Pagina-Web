/**
 * Colección de servicios, mostrado en grid con tres elementos por fila.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
function Servicios({ children }) {
    return (
        <div id="grid-servicios">
            {children}
        </div>
    )
}

export default Servicios;