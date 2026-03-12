import SectionTitle from "../SectionTitle.jsx";
import AboutUsCards from "./AboutUsCards.jsx";
import AboutUsCard from "./AboutUsCard.jsx";

/**
 * Sección About Us (Sobre Nosotros).
 *
 * @param sectionTitle Título de la sección a mostrar.
 * @returns {React.JSX.Element}
 * @constructor
 */
function AboutUsSection({ sectionTitle }) {
    return (
        <section id="about-us">
            <div className="about-us-container bg-section-alt">
                <SectionTitle title={sectionTitle} />
                <AboutUsCards>
                    <AboutUsCard
                        iconText={"AI"}
                        backgroundImg={"/src/img/about-us/d.jpg"}
                        title={"Artificial Intelligence"}
                        text={"AI applied to Human Resources processes"}
                        link={"#"}
                    />

                    <AboutUsCard
                        iconImage={"/src/img/logos/logo_sap.png"}
                        backgroundImg={"/src/img/about-us/a.jpg"}
                        title={"SAP HCM and Employee Central Payroll"}
                        text={"New Implementations and Maintenances"}
                        link={"#"}
                    />

                    <AboutUsCard
                        iconImage={"/src/img/icons/ico_ssff.png"}
                        backgroundImg={"/src/img/about-us/b.jpg"}
                        title={"Success Factors Employee Central"}
                        text={"Employee Central Core, Workshops, Requirements Definition, Functional Design, Business Blue Print, Build"}
                        link={"#"}
                    />

                    <AboutUsCard
                        iconText={"HR"}
                        backgroundImg={"/src/img/about-us/c.jpg"}
                        title={"Human Resources Processes"}
                        text={"Spanish Payroll, Social Security, Taxes HR Processes"}
                        link={"#"}
                    />
                </AboutUsCards>
            </div>
        </section>
    )
}

export default AboutUsSection;