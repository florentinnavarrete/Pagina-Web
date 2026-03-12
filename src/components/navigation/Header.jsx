import { useEffect, useState } from "react";
import LanguageSelect from "../language/LanguageSelect.jsx";
import Logo from "../Logo.jsx";
import NavMenu from "./NavMenu.jsx";
import LanguageOption from "../language/LanguageOption.jsx";
import NavItem from "./NavItem.jsx";

/**
 * Cabecera de la página principal.
 *
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /** Píxeles que se deben scrollear hacia abajo
     * antes de mostrar el fondo del menú de la cabecera.
     */
    const PX_BEFORE_VISIBLE = 20;

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > PX_BEFORE_VISIBLE);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header${scrolled ? " header-scrolled" : ""}`}>
            <Logo src={"/src/img/logos/logo.png"} alt={"Logo de OKSAP"}/>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <div className={`nav-wrapper ${menuOpen ? "nav-open nav-overlay" : ""}`}>

                <button
                    className="menu-close"
                    onClick={() => setMenuOpen(false)}
                >
                    ✕
                </button>

                <LanguageSelect title={"LANGUAGE"}>
                    <LanguageOption language={"ENGLISH"} src={"/src/img/lang/eng.png"} alt={"English"} />
                    <LanguageOption language={"ESPAÑOL"} src={"/src/img/lang/espana.png"} alt={"Español"} />
                    <LanguageOption language={"DEUTSCH"} src={"/src/img/lang/alemania.png"} alt={"Deutsch"} />
                    <LanguageOption language={"FRANÇAIS"} src={"/src/img/lang/francia.png"} alt={"Français"} />
                    <LanguageOption language={"NORSK"} src={"/src/img/lang/noruega.png"} alt={"Norsk"} />
                    <LanguageOption language={"SVENSKA"} src={"/src/img/lang/suecia.png"} alt={"Svenska"} />
                </LanguageSelect>

                <NavMenu>
                    <NavItem link={"#"} title={"HOME"} />
                    <NavItem link={"#"} title={"AI VIDEOS"} />
                    <NavItem link={"#"} title={"BLOG"} />
                    <NavItem link={"#"} title={"ABOUT US"} />
                    <NavItem link={"#"} title={"CONTACT"} />
                </NavMenu>

            </div>
        </header>
    )
}