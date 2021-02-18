import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './style.css';
// import '../../global.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [option, setOption] = useState(0);

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            if (option === 0) {
                const response = await api.post('sessions', { email, password, option });
                localStorage.setItem('ongId', response.data.id);
                localStorage.setItem('ongEmail', response.data.email);
                localStorage.setItem('ongName', response.data.name);
                history.push('/home');
            } else {
                const response = await api.post('sessions', { id, password, option });
                localStorage.setItem('ongId', response.data.id);
                localStorage.setItem('ongEmail', response.data.email);
                localStorage.setItem('ongName', response.data.name);
                history.push('/home');
            }
        } catch (err) {
            alert('Falha no login, tente novamente');
        }
    }


    function ToggleLoginOption() {
        if (option === 0) {
            setOption(1);
        } else {
            setOption(0);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Fazer login</h1>

                    <div className="input-block">
                        <input
                            type={option === 0 ? "email" : "text"}
                            placeholder={option === 0 ? "Seu email" : "Sua ID"}
                            value={option === 0 ? email : id}
                            onChange={e => option === 0 ? setEmail(e.target.value) : setId(e.target.value)}
                        />
                        <button type="button" onClick={ToggleLoginOption}>{option === 0 ? "Login com id" : "Login com e-mail"}</button>
                    </div>

                    <div className="input-block">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>


    );
}