import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from '../../services/api';

const MyAccount = () => {
    const [ongInfo, setOngInfo] = useState([]);
    const id = localStorage.getItem('ongId');

    const [ongName, setOngName] = useState('');
    const [ongEmail, setOngEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [UF, setUF] = useState('');

    useEffect(() => {
       api.post('/ongInfo', {id})
        .then((res) => {
            setOngInfo(res.data);
        }).catch((err) => {
            alert('Algum erro ocorreu, tente novamente!');
        })
    }, [ongInfo]);

    return (
        <div className="myaccount-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Minha conta</h1>
                    <p>Aqui você pode consultar seus dados e atualizá-los sempre que precisar para continuar trazendo o heroísmo a todos!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={() => { }}>
                    <div className="input-group">
                        <label>Nome da ONG</label>
                        <input
                            placeholder="Nome da ong"
                            type="text"
                            value={ongName}
                        />
                    </div>
                    <div className="input-group">
                        <label>Nome da ONG</label>
                        <input
                            placeholder="Nome da ong"

                        />
                    </div>
                    <div className="input-group">
                        <label>Nome da ONG</label>
                        <input
                            placeholder="Nome da ong"

                        />
                    </div>
                    <div className="input-group">
                        <label>Nome da ONG</label>
                        <input
                            placeholder="Nome da ong"

                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default MyAccount;