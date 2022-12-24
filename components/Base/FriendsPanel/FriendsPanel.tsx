import styles from './FriendsPanel.module.sass';
import React from 'react';
import useClient from "../../../hooks/useClient";
import { useUserBasicDataQuery } from "../../../redux/api/mambaApi";
import { BsFillChatSquareDotsFill as ChatIcon } from "react-icons/bs";


const FriendPreview: React.FC<{ userId: string | null }> = ({ userId }) => {
    const { data: user, isLoading, isError } = useUserBasicDataQuery(userId);
    let profilePictureSrc = 'user/user.png';

    if (isLoading) {
        return (
            <div className={styles.friendPreviewSkeleton} />
        );
    }

    if (isError || !user) {
        return <></>;
    }

    return (
        <div className={styles.friendPreviewWrapper}>
            {/* Friend data */}
            <div className={styles.friendPreviewData}>
                <img src={profilePictureSrc} alt={''}/>
                <span>{ user?.username }</span>
            </div>
            {/* Shortcut icons */}
            <div className={styles.friendPreviewShortcuts}>
                <ChatIcon />
            </div>
        </div>
    );
}


const FriendsPanel: React.FC = () => {
    const { data: client, isLoading, isError } = useClient();

    let friends: JSX.Element;
    if (isLoading) {
        friends = (
            <div className={styles.loadingPanel} />
        );
    } else if (isError || !client) {
        friends = (
            <div className={styles.errorPanel}>Error loading data!</div>
        );
    } else if (!client.friends) {
        friends = (
            <div className={styles.noFriendsNotifier}>You have no friends yet!</div>
        );
    } else {
        const list: JSX.Element[] = client.friends.map(friendId => <FriendPreview userId={friendId} />);
        friends = (
            <div>
                { list }
            </div>
        );
    }

    return (
        <div className={styles.context}>
            <h2>Friends</h2>
            <hr />
            <div className={styles.friendsListWrapper}>
                { friends }
            </div>
        </div>
    );
}

export default FriendsPanel;
