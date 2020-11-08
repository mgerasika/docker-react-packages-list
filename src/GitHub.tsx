import React, {useEffect, useState} from "react";
import { gql } from '@apollo/client';
import {
    MyRepositoryFragmentDoc,
    Repository,
    SearchResultItemEdge,
    useSearchReactReposQuery
} from "./generated/graphql-hooks-server2";
import {GithubLoginButton} from "react-social-login-buttons";
import {apolloClientGithub} from "./options/createBookMutationOptions";
const queryString = require('query-string');

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

type State = {
    first?:number,
    last?:number,
    after?:string | null
    before?:string | null
}
const SIZE = 10;
export const GitHub: React.FC<Props> = () => {
    const [state,setState] = useState<State>({first:SIZE});

    const { loading, error, data } = useSearchReactReposQuery({client:apolloClientGithub, variables:{ ...state} as any});

    const items = data?.search?.edges?.map((item)=>{
        const node:Repository = item?.node as unknown as Repository;
        return {
            cursor:item?.cursor,
            id:node.id,
            name: node.name,
            stargazerCount:node.stargazerCount,
            forkCount:node.forkCount
        }
    }) || [];

    const renderItems = items.map(item =>{
        return <div key={item.name}>
            <b>name:{item.name}</b> |
            <label>cursor:{item.cursor}</label> |
            <label>stargazerCount:{item.stargazerCount}</label> |
            <label>forkCount:{item.forkCount}</label>
        </div>
    })
    return <div>
        <h3>Github</h3>

        <pre>error:{JSON.stringify(error,null,2)}</pre>
        {renderItems}


        <button onClick={()=>{
            setState( {
                last:SIZE,
                before:items[0].cursor
            })
        }}>prev</button>
        <button onClick={()=>{
            setState( {
                first:SIZE,
                after:items[items.length-1].cursor
            })
        }}>next</button>



        <pre>data:{JSON.stringify(data?.search?.repositoryCount,null,2)}</pre>
        <pre>data:{JSON.stringify(data?.search?.pageInfo,null,2)}</pre>
    </div>
};

