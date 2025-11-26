import { useLocation } from "react-router-dom";

export function AdminPage(){
    const state = useLocation();
    console.log(state);
    return <h2>Admin page</h2>;
}