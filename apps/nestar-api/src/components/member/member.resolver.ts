import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => Member)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {
        console.log("INPUT:::", input)
        return this.memberService.signup(input)

    }

    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        console.log("MUTTATION LOGININPUT:::", input)
        return this.memberService.login(input)
    }

    @UseGuards(AuthGuard)
    @Query(() => String)
    public async chechAuth(@AuthMember("memberNick") memberNick: string): Promise<String> {
        console.log("DATA", memberNick)
        return `hi ${memberNick}`
    }

    @Roles(MemberType.AGENT, MemberType.USER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async chechAuthRoles(@AuthMember() authMember: Member): Promise<String> {
        return `hi ${authMember.memberNick}, you are ${authMember.memberType}, your id is ${authMember._id}`
    }




    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args("input") input: MemberUpdate,
        @AuthMember("_id") memberId: ObjectId): Promise<Member> {
        console.log("updateMember")
        delete input._id
        return this.memberService.updateMember(memberId, input)
    }



    @Query(() => Member)
    public async getMember(@Args("memberId") input: string): Promise<Member> {
        console.log("getMember")
        const targetId = shapeIntoMongoObjectId(input)
        return this.memberService.getMember(targetId)
    }



    /**ADMIN */

    //AUTHORIZATION
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin(): Promise<String> {
        return await this.memberService.getAllMembersByAdmin()
    }

    //AUTHORIZATION
    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<String> {
        return await this.memberService.updateMemberByAdmin()
    }


}
