import React from "react";
import { useQuery, gql } from '@apollo/client';

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
    if (error) return <p>Error :<pre> {JSON.stringify(error,null,2)}</pre></p>;

    const res = data.books.map(({ title}:{title:string}) => (
        <div key={title}>
            <p>
                {title}
            </p>
        </div>
    ));
    return <div>
        <h3>Books 2</h3>
        {res}
    </div>
};

