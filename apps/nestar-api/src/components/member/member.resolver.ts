import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => String)
    @UsePipes(ValidationPipe)
    public async signup(@Args("input") input: MemberInput): Promise<String> {
        console.log("signup")
        console.log("INPUT:::", input)
        return this.memberService.signup()
    }
    
    @Mutation(() => String)
    public async login(@Args("input") input: LoginInput): Promise<String> {
        console.log("login")
        console.log("LOGININPUT:::", input)
        return this.memberService.login()
    }

    @Mutation(() => String)
    public async updateMember(): Promise<String> {
        console.log("updateMember")
        return this.memberService.updateMember()
    }

    @Query(() => String)
    public async getMember(): Promise<String> {
        console.log("getMember")
        return this.memberService.getMember()
    }

}
