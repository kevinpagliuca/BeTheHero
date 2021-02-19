import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiTrash2 } from 'react-icons/fi';

import Header from '../../components/Header';

import './styles.css';

import api from '../../services/api';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [incidents, setIncidents] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const ongId = localStorage.getItem('ongId');

    const [totalData, setTotalData] = useState(0);
    const LastPage = Math.ceil(totalData / 8);
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.get(`incidents?page=${page}`)
            .then(response => {
                setIncidents(response.data[1]);
                setTotalData(response.data[0].total);
            })
    }, [ongId, page]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleChangePage(page) {
        setPage(page);
    }

    function toggleSeeMore() {
        setIsActive(true);
        document.getElementById('descriptionText').classList.remove('hiddenText');
        document.getElementById('descriptionText').classList.add('fullText');
    }

    return (
        <div className="lading-container">
            <Header />

            <h1>Listando todos os casos cadastrados no sistema</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <header>
                            <strong className="title">{incident.title}</strong>
                            <p className="ongName">{incident.name}</p>

                            <div>
                                <strong>Valor <FiArrowRight /></strong>
                                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                            </div>
                        </header>
                        <div className="description">
                            <strong>Descrição do caso</strong>

                            {incident.description.length > 200 ?
                                <>
                                    <p id="descriptionText" className="hiddenText">{incident.description}</p>
                                    {isActive === false ?
                                        <span id="seeActive" onClick={toggleSeeMore}>Ver mais</span>
                                        :
                                        null
                                    }
                                </>
                                :
                                <p className="fullText">{incident.description}</p>
                            }



                        </div>
                        
                        <Link className="show-detail" to={`incidentdetail/${incident.id}`}>
                            <span>Ver mais detalhes</span>
                        </Link>

                        {ongId === incident.ong_id ?
                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#fff" />
                            </button>
                            :
                            null
                        }
                    </li>
                ))}
            </ul>

            {
                totalData !== 0 ?
                    <Pagination page={page} LastPage={LastPage} changePage={handleChangePage} />
                    :
                    null
            }

        </div>
    );
}
export default Landing;