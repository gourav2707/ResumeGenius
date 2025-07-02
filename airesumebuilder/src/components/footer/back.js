import { useNavigate } from 'react-router-dom';
import './back.css';
function Back(){
    const navigate = useNavigate();

return<>
<button className='back-button' onClick={()=>navigate(-1)}>← Back</button>
</>

}
export default Back;