import React from "react";
import { RootStore, rootStore } from "./rootStore/rootStore";


export const StoreContext = React.createContext<RootStore | null>(null);

export function StoreProvider({children}: {children: React.ReactNode}) {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}