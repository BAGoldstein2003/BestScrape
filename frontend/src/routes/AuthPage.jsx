import RegisterForm from '../components/RegisterForm.jsx'
import './AuthPage.css'
import {motion, AnimatePresence } from 'framer-motion'

export default function AuthPage({isRegistered, setIsRegistered, userInfo, setUserInfo, setIsModal, setTypeModal, setModalText}) {
    return (
        <AnimatePresence mode="wait">
        {!isRegistered ? (
            <motion.div
            key="register"
            initial={{ opacity: 0, y: 600 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="register"
            >
            <RegisterForm
                setIsRegistered={setIsRegistered}
                setUserInfo={setUserInfo}
                setIsModal={setIsModal}
                setTypeModal={setTypeModal}
                setModalText={setModalText}
            />
            </motion.div>
        ) : (
            <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="welcome-user"
            >
                <h1>Welcome, {userInfo.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}!</h1>
            
            </motion.div>
        )}
        </AnimatePresence>
    
    )
}