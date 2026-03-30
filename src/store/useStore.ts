import React from "react";
import { StoreContext } from "./StoreProvider";


export function useStore() {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error('useStore most be')
    }
    return store;
}