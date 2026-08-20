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
    @Mutation(() => String)
    public async updateMember(@AuthMember("_id") memberId: ObjectId): Promise<String> {
        console.log("updateMember")
        console.log("DATA", memberId)
        return this.memberService.updateMember()
    }


    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember("memberNick") memberNick: string): Promise<String> {
        console.log("DATA", memberNick)
        return `hi ${memberNick}`
    }

    @Query(() => String)
    public async getMember(): Promise<String> {
        console.log("getMember")
        return this.memberService.getMember()
    }

    @Roles(MemberType.AGENT, MemberType.USER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<String> {
        return `hi ${authMember.memberNick}, you are ${authMember.memberType}`
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
