import { Outlet } from 'react-router-dom';

export function StudentLayout(){
    return (
        <div>
            <h1>Student page</h1>
            <Outlet />
        </div>);
}