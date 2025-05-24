import { motion } from "framer-motion";
import { SpinningCircles } from 'react-loading-icons'
import { MdReportGmailerrorred } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import './Modal.css'
 

export default function Modal({typeModal, modalText, setIsModal}) {

    const handleClose = () => {
        setIsModal(false)
    }

    if (typeModal === 'loading') {
        return (
            
            <motion.div className="modal-background">
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
        )
    }
    else if (typeModal === 'error') {
        return (
            
            <motion.div className="modal-background">
                
                <motion.div
                    className="info-area"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoCloseCircle className='close-button' size = "30" onClick={handleClose}></IoCloseCircle>
                    <h1>ERROR</h1>
                    <MdReportGmailerrorred className="error" size='100' fill="red" ></MdReportGmailerrorred>
                    <p className="desc">{modalText}</p>
                </motion.div>
            </motion.div>
        )
    }
    else if (typeModal === 'success') {
        return (
            <motion.div className="modal-background">
                
                <motion.div
                    className="info-area"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoCloseCircle className='close-button' size = "30" onClick={handleClose}></IoCloseCircle>
                    <h1>SUCCESS!</h1>
                    <FaCheckCircle className="success" size="100" fill="green"></FaCheckCircle>
                    <p className="desc">{modalText}</p>
                </motion.div>
            </motion.div>
        )
    }
}