import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<null >) { }

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
