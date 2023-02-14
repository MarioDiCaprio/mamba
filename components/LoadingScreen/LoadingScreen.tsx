import styles from "./LoadingScreen.module.sass";
import React from "react";
import Popup from "../Popup/Popup";
import {motion} from "framer-motion";


interface LoadingScreenProps {
    open: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open }) => {
    return (
        <Popup open={open}>

            <motion.img
                alt=""
                src="/logo/logo-icon.png"
                className={styles.image}
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ type: 'spring', duration: 1.2, delay: 1, repeat: Infinity }}
            />

        </Popup>
    );
}

export default LoadingScreen;
