import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { getSerialForImage, shapeIntoMongoObjectId, validMimeTypes } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Message } from '../../libs/enums/common.enum';


@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => Member)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {
        console.log("INPUT:::", input)
        return await this.memberService.signup(input)

    }

    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        console.log("MUTTATION LOGININPUT:::", input)
        return await this.memberService.login(input)
    }

    @UseGuards(AuthGuard)
    @Query(() => String)
    public async chechAuth(@AuthMember("memberNick") memberNick: string): Promise<String> {
        console.log("DATA", memberNick)
        return await `hi ${memberNick}`
    }

    @Roles(MemberType.AGENT, MemberType.USER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async chechAuthRoles(@AuthMember() authMember: Member): Promise<String> {
        return await `hi ${authMember.memberNick}, you are ${authMember.memberType}, your id is ${authMember._id}`
    }




    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args("input") input: MemberUpdate,
        @AuthMember("_id") memberId: ObjectId): Promise<Member> {
        console.log("updateMember")
        delete input._id
        return await this.memberService.updateMember(memberId, input)
    }



    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember(@Args("memberId") input: string, @AuthMember("_id") memberId: ObjectId): Promise<Member> {
        console.log("getMember")
        console.log(memberId)
        const targetId = shapeIntoMongoObjectId(input)
        return await this.memberService.getMember(memberId, targetId)
    }


    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getAgents(@Args("input") input: AgentsInquiry, @AuthMember("_id") memberId: ObjectId): Promise<Members> {
        console.log("getAgents")
        return await this.memberService.getAgents(memberId, input)
    }





    /**ADMIN */

    //AUTHORIZATION
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Members)
    public async getAllMembersByAdmin(@Args("input") input: MembersInquiry): Promise<Members> {
        console.log("getAllMembersByAdmin")
        return await this.memberService.getAllMembersByAdmin(input)
    }

    //AUTHORIZATION
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Member)
    public async updateMemberByAdmin(@Args("input") input: MemberUpdate): Promise<Member> {
        console.log("updateMemberByAdmigetAllMembersByAdmin")
        return await this.memberService.updateMemberByAdmin(input)
    }


    //**IMage UPLOADER */


    @UseGuards(AuthGuard)
    @Mutation((returns) => String)
    public async imageUploader(
        @Args({ name: 'file', type: () => GraphQLUpload })
        { createReadStream, filename, mimetype }: FileUpload,
        @Args('target') target: String,
    ): Promise<string> {
        console.log('Mutation: imageUploader');
        console.log("filename:", filename);
        console.log("mimetype:", mimetype);
        if (!filename) throw new Error(Message.UPLOAD_FAILED);
        const validMime = validMimeTypes.includes(mimetype);
        if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

        const imageName = getSerialForImage(filename);
        const url = `uploads/${target}/${imageName}`;
        const stream = createReadStream();

        const result = await new Promise((resolve, reject) => {
            stream
                .pipe(createWriteStream(url))
                .on('finish', async () => resolve(true))
                .on('error', () => reject(false));
        });
        if (!result) throw new Error(Message.UPLOAD_FAILED);

        return url;
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => [String])
    public async imagesUploader(
        @Args('files', { type: () => [GraphQLUpload] })
        files: Promise<FileUpload>[],
        @Args('target') target: String,
    ): Promise<string[]> {
        console.log('Mutation: imagesUploader');

        const uploadedImages: string[] = [];
        const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<void> => {
            try {
                const { filename, mimetype, encoding, createReadStream } = await img;

                const validMime = validMimeTypes.includes(mimetype);
                if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

                const imageName = getSerialForImage(filename);
                const url = `uploads/${target}/${imageName}`;
                const stream = createReadStream();

                const result = await new Promise((resolve, reject) => {
                    stream
                        .pipe(createWriteStream(url))
                        .on('finish', () => resolve(true))
                        .on('error', () => reject(false));
                });
                if (!result) throw new Error(Message.UPLOAD_FAILED);

                uploadedImages[index] = url;
            } catch (err) {
                console.log('Error, file missing!');
            }
        });

        await Promise.all(promisedList);
        return uploadedImages;
    }



}
