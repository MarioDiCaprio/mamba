import styles from "../styles/Index.module.sass";
import {NextPage} from "next";
import React from "react";
import {FaUserFriends as CommunityIcon} from "react-icons/fa";
import {MdPhotoCamera as CameraIcon} from "react-icons/md";
import {FaPaintBrush as BrushIcon} from "react-icons/fa";
import Link from "next/link";


const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>

        </div>
    );
}


const Index: NextPage = () => {
    return (
        <div className={styles.context}>

            <Navbar />

            <div className={styles.main}>

                <div className={styles.panelContainer}>

                    <div className={styles.leftPanel}>
                        <h1>Join the club</h1>
                        <p>
                            Share your thoughts on photography with thousands
                            of users worldwide!
                        </p>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <CommunityIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Community</h1>
                                <p>Connect with like-minded people</p>
                            </div>
                        </div>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <CameraIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Photography</h1>
                                <p>Show off your skills</p>
                            </div>
                        </div>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <BrushIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Art</h1>
                                <p>Explore art around the world</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.rightPanel}>
                        <h1>Welcome</h1>
                        <form>
                            <input className={styles.input} placeholder="Username" />
                            <input className={styles.input} placeholder="Password" />
                            <button className={styles.loginButton} type="submit">
                                Login
                            </button>
                        </form>
                        <p className={styles.signupSection}>
                            Not a member? <Link href="/signup">Sign up</Link>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}


export default Index;
