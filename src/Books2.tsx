import React from "react";
import {useBooksQuery, useCreateBookMutation} from "./generated/graphql-hooks";
//import {createBookMutationOptions} from "./options/createBookMutationOptions";

interface Props {}

export const Books: React.FC<Props> = () => {
    const { data } = useBooksQuery();
    const [createBook] = useCreateBookMutation();

    return (
        <div>
            <button
                onClick={() => {
                    // createBook(
                    //     createBookMutationOptions({
                    //         author: "" + Math.random(),
                    //         title: "random book"
                    //     })
                    // );
                }}
            >
                add book
            </button>
            {(data && data.books ? data.books : []).map(b => {
                return (
                    <div key={b!.title! + b!.author}>
                        {b!.title} {b!.author}
                    </div>
                );
            })}
        </div>
    );
};

