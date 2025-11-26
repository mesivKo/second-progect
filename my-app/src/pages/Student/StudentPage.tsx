import { useNavigate } from "react-router-dom";
import StudentTestPage from "./StudentsTest";

export function StudentPage(){
    const navigate = useNavigate();
    
    const handleTest = () => {
        navigate('/student/tests')
    }

    return <div>

            <h2>Student page</h2>
            <StudentTestPage />
            <button onClick={() => navigate(-1)}>Go Back</button>
            <button onClick={() => handleTest()}> Пройти тест </button>
        </div>;
}