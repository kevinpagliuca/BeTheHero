import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from '../../services/api';
import ChangePassModal from '../../components/Modal/ChangePassModal';

const MyAccount = () => {
    const id = localStorage.getItem('ongId');
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    useEffect(() => {
        api.post('/ongInfo', { id })
            .then((res) => {
                setName(res.data.name);
                setEmail(res.data.email);
                setWhatsapp(res.data.whatsapp);
                setCity(res.data.city);
                setUF(res.data.uf);
            }).catch((err) => {
                alert('Algum erro ocorreu, tente novamente!');
            })
    }, [id]);

    function toggleModal() {
        if (modalVisible === false) {
            setModalVisible(true)
        } else {
            setModalVisible(false);
        }
    }

    async function handleUpdateData(e) {
        e.preventDefault();

        const dataUser = { name, email, whatsapp, city, uf };

        await api.put('/ongs', dataUser, {
            headers: { id }
        }).then(res => {
            localStorage.setItem('ongEmail', email);
            localStorage.setItem('ongName', name);            
            alert('Dados alterados com sucesso!');
        }).catch(err => {
            alert('Algum erro ocorreu durante a atualização de dados, tente novamente!')
        })
    }

    return (
        <div className="myaccount-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Minha conta</h1>
                    <p>Aqui você pode consultar seus dados e atualizá-los sempre que precisar para continuar trazendo o heroísmo a todos!</p>

                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleUpdateData}>

                    <div className="input-group">
                        <label>Nome da Instituição</label>
                        <input
                            placeholder="Nome da ong"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                            placeholder="Nome da ong"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Whatsapp</label>
                        <input
                            placeholder="Nome da ong"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Cidade e UF</label>
                        <div className="group">

                            <input
                                placeholder="Nome da ong"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />

                            <input
                                placeholder="UF"
                                value={uf}
                                style={{ width: 80, marginLeft: 10 }}
                                onChange={e => setUF(e.target.value)}
                            />
                        </div>
                    </div>

                    <span
                        className="changePass"
                        onClick={toggleModal}
                    >
                        Desejo alterar minha senha!
                    </span>



                    <button className="button" type="submit">Atualizar dados</button>
                </form>

                <ChangePassModal
                    modalVisible={toggleModal}
                    visible={modalVisible}
                />
            </div>
        </div>
    )
}

export default MyAccount;