import styles from "./LoaderOnStart.module.sass";
import React from "react";
import {AnimatePresence, motion} from "framer-motion";


const LoaderOnStart: React.FC = () => {
    return (
        <AnimatePresence>
            <motion.div
                className={styles.context}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >

                <motion.img
                    alt=""
                    src="/logo/logo-icon.png"
                    className={styles.image}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ type: 'spring', duration: 1.2, delay: 1, repeat: Infinity }}
                />

            </motion.div>
        </AnimatePresence>

    );
}


export default LoaderOnStart;
