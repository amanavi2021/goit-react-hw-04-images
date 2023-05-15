import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ImageModal } from './Modal.styled';

export const Modal = ({ imageURL, onClose}) => {

    useEffect(() => {
        const handleKeyDown = event => {
        if (event.code === "Escape") {
            onClose();
        };
    };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);  
    }, [onClose]);
    
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleBackdropClick}>
            <ImageModal>
                <img src={imageURL} alt="" />
            </ImageModal>
        </Overlay>
     );  
};

Modal.propTypes = {
    imageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func
}