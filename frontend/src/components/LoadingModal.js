import { motion } from "framer-motion";
import { SpinningCircles } from 'react-loading-icons'
import './LoadingModal.css'
 

export default function LoadingModal() {

    return (
        <motion.div className="loading-background">
            <motion.div
                className="info-area"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2>LOADING...</h2>
                <SpinningCircles className="spinning-circles" fill="blue" />
            </motion.div>
        </motion.div>
        
    
    )
}