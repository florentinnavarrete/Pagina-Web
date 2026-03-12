/**
 * Colección de tarjetas que muestran los diferentes miembros del equipo.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
function TeamCards({ children }) {
    return (
        <div className="team-cards">
            {children}
        </div>
    )
}

export default TeamCards;