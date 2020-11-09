import React, { ReactNode } from "react"

export type TTableHeader<T> = {
    name:keyof T;
    title:string;
    renderCell?:(header:TTableHeader<T>, data:T)=>ReactNode;
}

type Props<T> = {
    uniqueKey:keyof T;
    headers:TTableHeader<T>[];
    dataSource:T[];
}

export function Table<T>(props:Props<T>) {
    const headers = props.headers.map((header:TTableHeader<T>) => {
        return <span key={header.name as string}>{header.name} | </span>
    });


    const rows = props.dataSource.map((data:T) => {
        const unique = data[props.uniqueKey] as unknown as string;

        const row =  props.headers.map((header:TTableHeader<T>) => {
            const cell = header.renderCell ? header.renderCell(header,data) : <>{data[header.name]}</> ;
            return <span key={header.name as string}>{cell} | </span>
        }); 

        return <div key={unique}>
            {row}
        </div>
    });

    return <div>
        <div>
        {headers}
        </div>
        <div>
        {rows}
        </div>
    </div>
}