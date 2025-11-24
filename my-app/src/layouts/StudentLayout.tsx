import { Outlet } from 'react-router-dom';

export function Student(){
    return (
        <div>
            <h1>Student page</h1>
            <Outlet />
        </div>);
}