import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

import './styles.css';

import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');

    const [totalData, setTotalData] = useState(0);
    const LastPage = Math.ceil(totalData / 6);
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.get(`myincidents?page=${page}`, {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
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

    return (
        <div className="profile-container">
            <Header />
            <h1>Meus casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
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
    )
}