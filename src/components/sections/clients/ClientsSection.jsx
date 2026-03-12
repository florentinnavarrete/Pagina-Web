import ClientSlider from "./ClientSlider.jsx";
import SectionTitle from "../SectionTitle.jsx";
import ClientElement from "./ClientElement.jsx";

/**
 * Sección de clientes, tanto los normales como los de TIC.
 *
 * @param titleClients Título de la sección de clientes normales.
 * @param titleClientsIT Título de la sección de clientes TIC.
 * @returns {React.JSX.Element}
 * @constructor
 */
function ClientsSection({ titleClients, titleClientsIT }) {
    return (
        <section id="clients">
            <div className="clients-section bg-section">
                <SectionTitle title={titleClients} />
                <ClientSlider
                    slidesToShow={6}
                    autoplay={true}>
                    <ClientElement img={"/src/img/clients/client-01.png"} client={"TransGourmet"} />
                    <ClientElement img={"/src/img/clients/client-02.png"} client={"RyanAir"} />
                    <ClientElement img={"/src/img/clients/client-03.png"} client={"Vall Companies Grupo"} />
                    <ClientElement img={"/src/img/clients/client-04.png"} client={"Fujitsu"} />
                    <ClientElement img={"/src/img/clients/client-05.png"} client={"Gobierno de Madrid"} />
                    <ClientElement img={"/src/img/clients/client-06.png"} client={"Benteler"} />
                    <ClientElement img={"/src/img/clients/client-07.png"} client={"Bombardier"} />
                    <ClientElement img={"/src/img/clients/client-08.png"} client={"Gobierno Vasco"} />
                    <ClientElement img={"/src/img/clients/client-09.png"} client={"Garrigues"} />
                    <ClientElement img={"/src/img/clients/client-10.png"} client={"CaixaBank"} />
                    <ClientElement img={"/src/img/clients/client-11.png"} client={"Airbus"} />
                    <ClientElement img={"/src/img/clients/client-12.png"} client={"UPC"} />
                    <ClientElement img={"/src/img/clients/client-13.png"} client={"Vodafone"} />
                    <ClientElement img={"/src/img/clients/client-14.png"} client={"Dr. Schneider"} />
                    <ClientElement img={"/src/img/clients/client-15.png"} client={"Boehringer Ingelheim"} />
                </ClientSlider>
            </div>

            <div className="clients-section bg-section-alt">
                <SectionTitle title={titleClientsIT} />
                <ClientSlider
                    slidesToShow={6}
                    reverse={true}
                    autoplay={true}
                    autoplaySpeed={3000}>
                    <ClientElement img={"/src/img/clients/it-clients/it-01.png"} client={"SAP"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-02.png"} client={"Epi Use"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-03.png"} client={"ADP"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-04.png"} client={"SMX Services & Consulting"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-05.png"} client={"Zalaris"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-06.png"} client={"Accenture"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-07.png"} client={"Sariba HR"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-08.png"} client={"Capgemini"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-09.png"} client={"ZOI"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-10.png"} client={"ImagineRight"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-11.png"} client={"Keyland Sistemas de Gestión"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-12.png"} client={"Sapas"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-13.png"} client={"SNP"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-14.png"} client={"Sopra"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-15.png"} client={"HR Path"} />
                    <ClientElement img={"/src/img/clients/it-clients/it-16.png"} client={"EY"} />
                </ClientSlider>
            </div>
        </section>
    )
}

export default ClientsSection;