import React, { useCallback, useMemo, useState} from "react";
import {
    Repository,
    useSearchReactReposQuery
} from "../../generated/graphql-hooks-github";
import { getApolloClient } from "../../common/apollo-client";
import { Table, TTableHeader } from "../table/table";
import { Button, Space, Tag } from 'antd';
import { useTheme } from "react-jss";
import { useStyles } from "./github.style";

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

const ITEMS_PER_PAGE = 10;
export const GitHub: React.FC<Props> = () => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [state,setState] = useState<State>({paging:{first:ITEMS_PER_PAGE}});
    const { data } = useSearchReactReposQuery({client:getApolloClient('github'), variables:{ ...state.paging} as any});
    const headers = useMemo(()=>{
        return [
            {
                name: "name",
                title : "Name",
            },
            {
                name: "stargazerCount",
                title : "Stars",
                renderCell: (_header,data) => <Tag className={classes.stars}>{data.stargazerCount}</Tag>
            },
            {
                name: "forkCount",
                title : "Forks",
                renderCell: (_header,data) => <Tag className={classes.forks}>{data.forkCount}</Tag>
            }
        ] as TTableHeader<TDataItem>[];
    },[classes]);

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

    const handleNextClick = useCallback(()=>{
        setState( prev => ({
            ...prev,
            paging: {
            first:ITEMS_PER_PAGE,
            after:dataSource[dataSource.length-1].cursor
            }
        }));
    },[dataSource]);

    const handlePrevClick = useCallback(()=>{
        setState( prev =>( {
            ...prev,
            paging: {
            last:ITEMS_PER_PAGE,
            before:dataSource[0].cursor
            }
        }));
    },[dataSource]);

    return <div>
        <h2>Most popular react projects</h2>
        <Table<TDataItem> headers={headers} dataSource={dataSource} uniqueKey={'id'}/>
        <Space>
        <Button disabled={!data?.search?.pageInfo.hasPreviousPage} type="primary" onClick={handlePrevClick}>Prev</Button>
        <Button disabled={!data?.search?.pageInfo.hasNextPage} type="primary" onClick={handleNextClick}>Next</Button>
        </Space>
    </div>
};

