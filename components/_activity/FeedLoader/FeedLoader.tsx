import React from "react";
import { usePostAllQuery } from "../../../redux/api/mambaApi";
import PostList from "../../PostList/PostList";


/**
 * This component loads the public feed. The queried posts are displayed with the {@link PostList} component.
 * @returns The component
 */
const FeedLoader: React.FC = () => {
    // TODO add pagination
    const { data, isError, isLoading } = usePostAllQuery(1);

    return (
        <PostList
            posts={data?.content}
            isLoading={isLoading}
            isError={isError}
        />
    );
}

export default FeedLoader;
