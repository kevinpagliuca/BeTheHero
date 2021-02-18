import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import './styles.css';

const Pagination = ({ page, LastPage, changePage }) => {
    return (
        <div className="pagination-container">
            {page !== 1 ?
                <button onClick={() => changePage(1)}><FiArrowLeft /></button>
                :
                null
            }

            {page - 2 > 0 ?
                <button onClick={() => changePage(page - 2)}>{page - 2}</button>
                :
                null
            }

            {page - 1 > 0 ?
                <button onClick={() => changePage(page - 1)}> {page - 1}</button>
                :
                null
            }
            <button className="btn-active">
                {page}
            </button>

            {page + 1 <= LastPage ?
                <button onClick={() => changePage(page + 1)}>{page + 1}</button>
                :
                null
            }

            {page + 2 < LastPage ?
                <button onClick={() => changePage(page + 2)}> {page + 2}</button>
                :
                null
            }

            {page !== LastPage ?
                <button onClick={() => changePage(LastPage)}><FiArrowRight /></button>
                :
                null
            }
            <span>Total de {LastPage} páginas</span>
        </div>
    );
}

export default Pagination;