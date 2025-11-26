import { Link } from 'react-router-dom';

export default function StudentsTest() {
    const students = [
        { id: 1, name: 'Python' },
        { id: 2, name: 'JS' },
        { id: 3, name: 'GOLang' },
    ];

    return (
        <ul>
            {students.map(s => (
                <li key={s.id}> 
                    <Link to={`/student/test/${s.id}`}>{s.name}</Link>
                </li> 
            ))}
        </ul>
    );
}