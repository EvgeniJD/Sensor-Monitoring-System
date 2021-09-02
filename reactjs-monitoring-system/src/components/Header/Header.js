import logo from '../../assets/images/hilscher-logo.png';
import './Header.css';

function Header() {
    return (
        <div className="header_image">
            <img src={logo} alt="" />
        </div>
    )
};

export default Header;