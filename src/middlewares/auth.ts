import secret from './secret';
import { expressjwt as jwt } from "express-jwt"; 
export default jwt(
    {
        secret: secret.key,
        algorithms: ["HS256"],
    }
);
    
