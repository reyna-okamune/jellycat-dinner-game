import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    // On Mount Check Window Size
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, []);

    // Toggle Menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="nav-container">

            {/* Hamburger Menu Button */}
        
            <button className={`hamburger ${menuOpen ? "open" : ""} ${isMobile ? "mobile" : ""}`} onClick={toggleMenu}>
                <span className="material-symbols-outlined">
                menu
                </span>
            </button>

            {/* Navigation List */}
            <div>
                <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
                    <li>
                        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>dashboard</Link>
                    </li>
                    <li>
                        <Link to="/memorygame" className="nav-link" onClick={() => setMenuOpen(false)}>memory game</Link>
                    </li>
                    <li>
                        <Link to="/matchinggame" className="nav-link" onClick={() => setMenuOpen(false)}>matching game</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;