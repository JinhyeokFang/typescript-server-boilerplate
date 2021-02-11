import { encode, decode } from 'jwt-simple';

export enum TokenStatus {
    OK,
    Expired,
    Wrong
}

export enum TokenType {
    AccessToken,
    RefreshToken
}

export interface CheckFunctionReturnValue {
    status: TokenStatus;
    userData?: object;
}

export class JWT {
    public static encodeToken (data: object): string {
        return encode(data, "SECRET_KEY");
    }

    public static decodeToken (token: string): any {
        return decode(token, "SECRET_KEY");
    }

    public static createAccessToken (userData: object): string {
        return this.encodeToken({
            userData,
            type: TokenType.AccessToken,
            time: new Date().getTime()
        });
    }

    public static createRefreshToken (userData: object): string {
        return this.encodeToken({
            userData,
            type: TokenType.RefreshToken,
            time: new Date().getTime()
        });
    }
    
    public static checkAccessToken (token: string): CheckFunctionReturnValue {
        try {
            let data = this.decodeToken(token);
            if (data.time < new Date().getTime() - 1 * 60 * 60 * 1000) {
                return {status: TokenStatus.Expired};
            } else {
                if (data.type == TokenType.AccessToken)
                    return {status: TokenStatus.OK, userData: data.userData};
                return {status: TokenStatus.Wrong};
            }
        } catch (error) {
            return {status: TokenStatus.Wrong};
        }
    }

    public static checkRefreshToken (token: string): CheckFunctionReturnValue {
        try {
            let data = this.decodeToken(token);
            if (data.time < new Date().getTime() - 1 * 24 * 60 * 60 * 1000) {
                return {status: TokenStatus.Expired};
            } else {
                if (data.type == TokenType.RefreshToken)
                    return {status: TokenStatus.OK, userData: data.userData};
                return {status: TokenStatus.Wrong};
            }
        } catch (error) {
            return {status: TokenStatus.Wrong};
        }
    }
}