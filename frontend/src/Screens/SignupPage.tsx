// first time signing in
import { useNavigate } from "react-router";

export function SignupPage(){
    //useeffect hook for getting the rquest
    
    const navigate=useNavigate();
    return <>
    <h1>
        <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <input type="submit" value="signup" />
            
        </form>
    </h1>
    </>
}
export default SignupPage;