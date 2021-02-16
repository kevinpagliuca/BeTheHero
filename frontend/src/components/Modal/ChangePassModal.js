import React from 'react';
import { FaTimes } from 'react-icons/fa';

import './styles.css';

const ChangePassModal = (props) => {
    return (
        <div className={props.visible === false ? "backdrop" : "backdrop activeModal"}>
            <div className="container-modal">
                <article className="modal-content">
                    <h2>Alterar minha senha</h2>

                    <FaTimes
                        className="closeModal-icon"
                        size={24}    
                        onClick={props.modalVisible}                    
                    />

                    <form className="cpass-form">
                        <div className="input-group">
                            <input
                                placeholder="Senha antiga"
                            />
                        </div>
                        <div className="input-group">                            
                            <input
                                placeholder="Nova senha"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                placeholder="Confirmar nova senha"
                            />
                        </div>

                        <button type="submit" className="button">Alterar senha</button>
                    </form>
                </article>
            </div>
        </div>
    );
}

export default ChangePassModal;