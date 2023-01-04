import styles from "./LinksPanel.module.sass";
import React from "react";
import { MdOutlineCollectionsBookmark as ActivityIcon } from 'react-icons/md';
import { BsHeartFill as LikesIcon } from 'react-icons/bs';
import { useRouter } from "next/router";


/**
 * This is the sidebar's links panel. It contains all useful links
 * to other pages. The active link is highlighted, while the other ones
 * are not. This panel is responsive and renders differently on large-
 * and medium-sized screens.
 * @returns The links panel
 */
const LinksPanel: React.FC = () => {
    const router = useRouter();

    /**
     * Function that composes the correct css classes for each link.
     * @param link The link to compose css classes for
     * @returns The corresponding css classes
     */
    function linkStyle(link: string): string | undefined {
        if (link === router.pathname)
            return [styles.panelLink, styles.panelLinkActive].join(' ');
        return styles.panelLink;
    }

    return (
        <div className={styles.linksPanel}>

            {/* Activity */}
            <div className={linkStyle('/activity')} data-test="activity">
                <ActivityIcon onClick={() => router.push('/activity')} data-test="activity-icon"/>
                <span>Activity</span>
            </div>

            {/* Likes */}
            <div className={linkStyle('/likes')} data-test="likes">
                <LikesIcon onClick={() => router.push('/likes')} data-test="likes-icon"/>
                <span>Likes</span>
            </div>

        </div>
    );
}

export default LinksPanel;
