import styles from "./AccountPanel.module.sass";
import React from "react";
import { UserResponse } from "../../../redux/models/user";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";


/**
 * Props for the `<AccountPanel>` component.
 * @see {@link AccountPanel}
 */
interface AccountPanelProps {
    /** The user to be displayed on the panel */
    user: UserResponse;
}


/**
 * This is the account panel for the `Base`'s sidebar, which is
 * rendered when the user is logged in. It contains the user's username,
 * their profile picture and the number of followers and following users.
 * @returns The account panel
 * @see {@link AccountPanelProps}
 */
const AccountPanel: React.FC<AccountPanelProps> = ({ user }) => {
    return (
        <div className={styles.accountPanel}>
            {/* Profile picture */}
            <ProfilePicture bytes={user.profilePicture} imgProps={{ className: styles.profilePicture }} />
            {/* Username */}
            <span data-test="username">{ user.username }</span>
            {/* Horizontal separator */}
            <hr className={styles.hr} />
            {/* Followers and Following (wrapper) */}
            <div className={styles.followersAndFollowing}>
                {/* Followers */}
                <div>
                    <span>Followers</span>
                    <span data-test="followers">
                        { user.followers.length }
                    </span>
                </div>
                {/* Following */}
                <div>
                    <span>Following</span>
                    <span data-test="following">
                        { user.following.length }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AccountPanel;
