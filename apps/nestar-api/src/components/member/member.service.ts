import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Member, Members } from '../../libs/dto/member/member';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { MemberStatus, MemberType } from '../../libs/enums/member.enum';
import { Direction, Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';
import { ObjectId } from 'mongoose';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewService } from '../view/view.service';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';
@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<Member>,
        private authService: AuthService,
        private viewService: ViewService
    ) { }

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

    public async getMember(memberId: ObjectId | null, targetId: ObjectId): Promise<Member> {

        const search: T = {
            _id: targetId,
            memberStatus: {
                $in: [MemberStatus.ACTIVE, MemberStatus.BLOCK]
            }
        }

        let targetMember = await this.memberModel.findOne(search).exec()

        if (!targetMember) throw new InternalServerErrorException(Message.NO_DATA_FOUND)


        if (memberId) {
            //view
            //increase

            const viewInput: ViewInput = { memberId: memberId, viewRefId: targetId, viewGroup: ViewGroup.MEMBER }

            const newView = await this.viewService.recordView(viewInput)

            if (newView) {
                await this.memberModel
                    .findOneAndUpdate(search, { $inc: { memberViews: 1 } }, { new: true }).exec()
                targetMember.memberViews++
            }
        }

        return targetMember
    }


    public async getAgents(memberId: ObjectId, input: AgentsInquiry): Promise<Members> {
        const { text } = input.search
        const match: T = { memberType: MemberType.AGENT, memberStatus: MemberStatus.ACTIVE }
        const sort: T = { [input?.sort ?? "createdAt"]: input?.direction ?? Direction.DESC }


        if (text) match.memberNick = { $regex: new RegExp(text, 'i') };
        console.log("match", match)


        const result = await this.memberModel.aggregate([
            { $match: match },
            { $sort: sort },
            {
                $facet: {
                    list: [{ $skip: (input.page - 1) * input.limit }, { $limit: input.limit }],
                    metaCounter: [{ $count: 'total' }]
                }
            }
        ])

        console.log("result", result)
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return result[0]
    }

    /**ADMIN */


    public async getAllMembersByAdmin(input: MembersInquiry): Promise<Members> {
        const { memberStatus, memberType, text } = input.search
        const match: T = {}
        const sort: T = { [input?.sort ?? "createdAt"]: input?.direction ?? Direction.DESC }

        if (memberStatus) match.memberStatus = memberStatus
        if (memberType) match.memberType = memberType

        if (text) match.memberNick = { $regex: new RegExp(text, 'i') };
        console.log("match", match)


        const result = await this.memberModel.aggregate([
            { $match: match },
            { $sort: sort },
            {
                $facet: {
                    list: [{ $skip: (input.page - 1) * input.limit }, { $limit: input.limit }],
                    metaCounter: [{ $count: 'total' }]
                }
            }
        ])

        console.log("result", result)
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND)


        return result[0]
    }

    public async updateMemberByAdmin(input: MemberUpdate): Promise<Member> {

        const result = await this.memberModel.findOneAndUpdate(
            { _id: input._id },
            input,
            { new: true }
        ).exec()

        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED)

        return result
    }


    public async memberStatsEditor(input: StatisticModifier): Promise<Member> {
        const { _id, targetKey, modifier } = input

        const result = await this.memberModel.findOneAndUpdate(
            { _id },
            { $inc: { [targetKey]: modifier } },
            { new: true }
        ).exec()

        if (!result) throw new InternalServerErrorException("memberStatsEditor error")
        return result
    }

}
