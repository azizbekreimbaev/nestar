import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { Member } from '../../libs/dto/member/member';
import { T } from '../../libs/types/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    public async hashPassword(memberPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(memberPassword, salt);
    }


    public async comparePasswords(password: string, hashedPassword: string | undefined): Promise<string> {
        return await bcrypt.compare(password, hashedPassword)
    }

    public async createToken(member: Member): Promise<string> {
        const payload: T = {}
        Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
            payload[`${ele}`] = member[`${ele}`];
        });
        delete payload.memberPassword
        console.log("member===", payload)

        return await this.jwtService.signAsync(payload)
    }


    public async verifyAuth(token: string): Promise<Member> {
        const member = await this.jwtService.verifyAsync(token)
        return member 
    }

}
