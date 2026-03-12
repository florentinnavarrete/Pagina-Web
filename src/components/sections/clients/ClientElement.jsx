/**
 * Elemento que representa a un cliente en el slider de clientes.
 *
 * @param img URL/ubicación de la imagen/logo del cliente.
 * @param client Nombre del cliente, usado para el texto alternativo.
 * @returns {React.JSX.Element}
 * @constructor
 */
function ClientElement({ img, client }) {
    return (
        <div className="client-item">
            <img src={img} alt={client} />
        </div>
    )
}

export default ClientElement;