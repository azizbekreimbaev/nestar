import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {


    public async signup(): Promise<String> {
        return "SIGNUP PAGE"
    }

    public async login(): Promise<String> {
        return "LOGIN PAGE"
    }

    public async updateMember(): Promise<String> {
        return "UPFDATE PAGE"
    }

    public async getMember(): Promise<String> {
        return "GTEMEMBER PAGE"
    }

}
