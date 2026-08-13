import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';
@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>) { }

    public async signup(input: MemberInput): Promise<Member> {
        try {
            //HASHING
            const result = await this.memberModel.create(input)
            // AUTHENTICATION TOKENS
            return result

        } catch (err) {
            console.log("ERROR on signup service model", err)
            throw new BadRequestException(err)
        }

    }

    // public async login(): Promise<Member> {
    //     try {

    //         return "LOGIN PAGE"


    //     } catch (err) {

    //         console.log("ERROR on signup service model", err)
    //         throw new BadRequestException(err)
    //     }


    // }

    public async updateMember(): Promise<String> {
        return "UPFDATE PAGE"
    }

    public async getMember(): Promise<String> {
        return "GTEMEMBER PAGE"
    }

}
