import Header from "./components/navigation/Header.jsx";
import PortadaSection from "./components/sections/PortadaSection.jsx";
import ServiciosSection from "./components/sections/services/ServiciosSection.jsx";
import AboutUsSection from "./components/sections/about-us/AboutUsSection.jsx";
import ClientsSection from "./components/sections/clients/ClientsSection.jsx";
import TeamSection from "./components/sections/team/TeamSection.jsx";
import Footer from "./components/footer/Footer.jsx";

/**
 * Componente que representa la página web, con todos los elementos
 * que la componen implementados.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
function App() {
    return (
        <>
            <Header />

            <PortadaSection
                title={"We're AI"}
                subtitle={"Success Factors, SAP HCM, Spanish Payroll"}
            />

            <main>
                <ServiciosSection />

                <AboutUsSection sectionTitle={"What We Know to Do"} />

                <ClientsSection
                    titleClients={"Our Clients"}
                    titleClientsIT={"Contracted by the best IT companies"}
                />

                <TeamSection sectionTitle={"Our Team"} />
            </main>

            <Footer
                companyName={"OKSAP Spain"}
                copyrightText={"Copyright 2025 © OKSAP Spain"}
                copyrightLink={"http://marketingconectado.com/"}
            />
        </>
    )
}

export default App;