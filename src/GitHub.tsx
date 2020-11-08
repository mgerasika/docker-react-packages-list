import React from "react";
import { useQuery, gql } from '@apollo/client';
import {useSearchReactReposQuery} from "./generated/graphql-hooks-server2";

const EXCHANGE_RATES = gql`
    query Books {
        book {
            title
            author
            index
        }
    }
`;

interface Props {}

export const Books2: React.FC<Props> = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map(({ title}:{title:string}) => (
        <div key={title}>
            <p>
                {title}
            </p>
        </div>
    ));
};

