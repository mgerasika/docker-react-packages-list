import React, { useMemo, useState} from "react";
import {
    Repository,
    useSearchReactReposQuery
} from "../generated/graphql-hooks-server2";
import { getApolloClient } from "../utils/apollo-client";
import { Table, TTableHeader } from "./table";

interface Props {}

type State = {
    paging: {
        first?:number,
    last?:number,
    after?:string | null
    before?:string | null
    }
}

type TDataItem = {
    cursor:string;
    id:string;
    name: string;
    stargazerCount:number;
    forkCount:number;
}

const SIZE = 10;
const headers:TTableHeader<TDataItem>[] = [
    {
        name: "name",
        title : "Name",
    },
    {
        name: "forkCount",
        title : "Forks",
    },
    {
        name: "stargazerCount",
        title : "Stars",
    }
];

export const GitHub: React.FC<Props> = () => {
    const [state,setState] = useState<State>({paging:{first:SIZE}});

    const { data } = useSearchReactReposQuery({client:getApolloClient('github'), variables:{ ...state.paging} as any});

    const dataSource = useMemo(()=>{
        return data?.search?.edges?.map((item)=>{
            const node:Repository = item?.node as unknown as Repository;
            return {
                cursor:item?.cursor,
                id:node.id,
                name: node.name,
                stargazerCount:node.stargazerCount,
                forkCount:node.forkCount
            } as TDataItem
        }) || [];
    },[data?.search?.edges]);

    return <div>
        <h3>Most popular react projects</h3>
        <Table<TDataItem> headers={headers} dataSource={dataSource} uniqueKey={'id'}/>
        <button onClick={()=>{
            setState( {
                ...state,
                paging: {
                last:SIZE,
                before:dataSource[0].cursor
                }
            })
        }}>prev</button>
        <button onClick={()=>{
            setState( {
                ...state,
                paging: {
                first:SIZE,
                after:dataSource[dataSource.length-1].cursor
                }
            })
        }}>next</button>
    </div>
};

