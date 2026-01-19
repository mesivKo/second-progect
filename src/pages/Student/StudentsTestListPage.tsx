import { Link } from 'react-router-dom';
import TestSearch from '../../components/TestSearch';

export default function StudentsTestListPage() {
    const students = [
        { id: 1, name: 'Python' },
        { id: 2, name: 'JS' },
        { id: 3, name: 'GOLang' },
    ];

    return (
        <div>
            <h1>Тестирования</h1>
            <TestSearch />
            <ul>
                {students.map(s => (
                    <li key={s.id}> 
                        <Link to={`/student/test/${s.id}`}>{s.name}</Link>
                    </li> 
                ))}
            </ul>
        </div>
    );
}