import styles from './HelixSpinner.module.sass';
import React from 'react';


const HelixSpinner: React.FC = () => {
    const dots: JSX.Element[] = [];
    for (let i=0; i<25; i++) {
        dots.push(<div className={styles.dot} key={i} />);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                { dots }
            </div>
        </div>

    );
}

export default HelixSpinner;
