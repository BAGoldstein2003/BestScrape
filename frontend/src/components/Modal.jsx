import { motion } from "framer-motion";
import { useEffect } from 'react'
import { SpinningCircles } from 'react-loading-icons'
import { MdReportGmailerrorred } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import './Modal.css'
 

export default function Modal({typeModal, modalText, setIsModal, isModal}) {

    useEffect(() => {
        if (!isModal && (typeModal !== 'error')) return;

            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    console.log('Escape key pressed while modal is open');
                    // Close modal
                    setIsModal(false)
                }
            };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup when modal closes or component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    if (typeModal === 'loading') {
        return (
            <>
            <motion.div className={`modal-background ${typeModal} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
                <SpinningCircles className="spinning-circles" fill="blue" />
                <motion.div
                    className="info-area"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1>loading</h1>
                    <SpinningCircles className="spinning-circles" fill="blue" />
                    <p className="desc">{modalText}</p>
                </motion.div>
            </motion.div>
            </>
        )
    }
    else if (typeModal === 'error') {
        return (
            <motion.div className={`modal-background ${typeModal} `}>
                
                <motion.div
                    className="info-area"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoCloseCircle className='close-button' size = "30" onClick={() => setIsModal(false)}></IoCloseCircle>
                    <h1>ERROR</h1>
                    <MdReportGmailerrorred className="error" size='100' fill="red" ></MdReportGmailerrorred>
                    <p className="desc">{modalText}</p>
                </motion.div>
            </motion.div>
        )
    }
    else if (typeModal === 'success') {
        return (
            <motion.div className={`modal-background ${typeModal} `}>
                
                <motion.div
                    className="info-area"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0, y: -700}}
                    transition={{ duration: 0.3 }}
                >
                    <IoCloseCircle className='close-button' size = "30" onClick={() => {setIsModal(false)}}></IoCloseCircle>
                    <h1>SUCCESS!</h1>
                    <FaCheckCircle className="success" size="100" fill="green"></FaCheckCircle>
                    <p className="desc">{modalText}</p>
                </motion.div>
            </motion.div>
        )
    }
}