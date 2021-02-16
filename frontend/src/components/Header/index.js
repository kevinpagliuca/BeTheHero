import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const Header = () => {
    const history = useHistory();
    const OngName = localStorage.getItem('ongName');

    function handleLogout() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <header className="header-content">
            <Link to="/home">
                <img src={logoImg} alt="Be The Hero" />
            </Link>
            <span> Seja bem vinda, {OngName} </span>

            <div className="btn-container">
                <Link className="btn-header" to="/home">Página inicial</Link>
                <Link className="btn-header" to="/incidents/new">Cadastrar novo caso</Link>
                <Link className="btn-header" to="/incidents/new">Meus casos</Link>
                <Link className="btn-header" to="/myaccount">Minha conta</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={28} color="#fff" />
                </button>
            </div>
        </header>
    );
}

export default Header;