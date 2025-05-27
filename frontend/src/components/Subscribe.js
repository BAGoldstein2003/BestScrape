import './Subscribe.css'
import {motion} from 'framer-motion'

export default function Subscribe({subscribe}) {


    return (
        <div className="subscribe">
            <motion.div className='button' onClick={subscribe}
             initial={{x: -1000 }}
             animate={{ x: 0 }}>
                    Click Here to Subscribe to our email system and recieve price-change updates!
            </motion.div>
        </div>
    )
}