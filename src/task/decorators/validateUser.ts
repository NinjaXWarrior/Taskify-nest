import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "../../auth/constants";

const User = createParamDecorator((data: any, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();

    const token: string = request.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtConstants.secret);
        console.log('decoded',decoded);
        return decoded;

      } catch(err) {
        // err
        console.log(err);
        return null ;
      }
})

export default User;