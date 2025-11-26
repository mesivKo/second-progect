import { useParams } from 'react-router-dom';

export default function StudentTestPage() {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h2>StudentTestPage {params.id}</h2>
            <p>Lorem ipsum dolor</p>
        </div>
    );
};