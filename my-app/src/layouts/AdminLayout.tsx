import { Outlet } from 'react-router-dom';

export function Admin(){
    return (
        <div>
            <h1>Admin page</h1>
            <Outlet />
        </div>);
}