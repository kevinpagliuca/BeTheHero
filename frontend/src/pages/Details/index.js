import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

const Details = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState({});

    useEffect(() => {
        async function loadIncident() {
            await api.get(`incidents/${id}`)
                .then(res => {  
                    setIncident(res.data);
                }).catch(err => {
                    alert('Whoops, parece que não encontramos esse caso, tente novamente!')
                })
        }
        loadIncident();
    }, [id]);

    return (
        <div className="detail-container">
        </div>
    );
}

export default Details;