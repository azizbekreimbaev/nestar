import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';
import { ObjectId } from 'mongoose';
import { MemberUpdate } from '../../libs/dto/member/member.update';
@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>,
        private authService: AuthService) { }

    public async signup(input: MemberInput): Promise<Member> {
        try {

            input.memberPassword = await this.authService.hashPassword(input.memberPassword)

            const result = await this.memberModel.create(input)
            // AUTHENTICATION TOKENS
            result.accessToken = await this.authService.createToken(result)
            console.log("accessToken", result)
            return result

        } catch (err) {
            console.log("ERROR on signup service model", err instanceof Error ? err.message : err)
            throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE)
        }

    }

    public async login(input: LoginInput): Promise<Member> {
        try {

            const { memberNick, memberPassword } = input
            const result = await this.memberModel.findOne({ memberNick: memberNick })
                .select("+memberPassword").exec()


            if (!result || result.memberStatus === MemberStatus.DELETE) {
                throw new InternalServerErrorException(Message.NO_MEMBER_NICK)
            } else if (result.memberStatus === MemberStatus.BLOCK) {
                throw new InternalServerErrorException(Message.BLOCKED_USER)
            }

            // BSCRYPT COMPARING PASSWORD

            const isMatch = await this.authService
                .comparePasswords(input.memberPassword, result.memberPassword)

            if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD)

            delete result.memberPassword

            result.accessToken = await this.authService.createToken(result)

            return result


        } catch (err) {

            console.log("ERROR on login service model", err)
            throw new BadRequestException(err)
        }


    }

    public async updateMember(memberId: ObjectId, input: MemberUpdate): Promise<Member> {
        const result: Member | null = await this.memberModel.findOneAndUpdate(
            { _id: memberId, memberStatus: MemberStatus.ACTIVE },
            input,
            { new: true }
        )

        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED)

        result.accessToken = await this.authService.createToken(result)

        return result
    }

    public async getMember(): Promise<String> {
        return "GTEMEMBER PAGE"
    }

    /**ADMIN */


    public async getAllMembersByAdmin(): Promise<String> {
        return "MUTATION getAllMembersByAdmin BY ADMIN"
    }

    public async updateMemberByAdmin(): Promise<String> {
        return "MUTATION updateMemberByAdmin BY ADMIN"
    }



}
