import React, { ReactNode } from "react"
import { useTheme } from "react-jss";
import { useStyles } from "./table.style";

export type TTableHeader<T> = {
    name:keyof T;
    title:string;
    renderCell?:(header:TTableHeader<T>, data:T,value:any)=>ReactNode;
}

type Props<T> = {
    uniqueKey:keyof T;
    headers:TTableHeader<T>[];
    dataSource:T[];
}

export function Table<T>(props:Props<T>) {
  const theme = useTheme();
  const classes = useStyles({ theme });

    const headers = props.headers.map((header:TTableHeader<T>) => {
        return <div key={header.name as string} className={classes.header}>{header.title} </div>
    });

    const rows = props.dataSource.map((data:T) => {
        const unique = data[props.uniqueKey] as unknown as string;

        const row =  props.headers.map((header:TTableHeader<T>) => {
            const value =data[header.name];
            const cell = header.renderCell ? header.renderCell(header,data,value) : <>{value}</> ;
            return <div key={header.name as string} className={classes.cell}>{cell}</div>
        }); 

        return <div key={unique} className={classes.row}>
            {row}
        </div>
    });

    return <div className={classes.table}> 
        <div className={classes.headerContainer}>
        {headers}
        </div>
        <div className={classes.dataContainer}>
        {rows}
        </div>
    </div>
} 