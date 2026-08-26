import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Property } from '../../libs/dto/property/property';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class PropertyService {
    constructor(@InjectModel("Property") private readonly propertyModel: Model<Property>) { }

    public async createProperty(input: PropertyInput): Promise<Property> {
        try {
            const result = await this.propertyModel.create(input)

            //increase memberProperty

            return result


        } catch (err) {
            console.log("ERROR, on createProperty", err)
            throw new InternalServerErrorException(Message.CREATE_FAILED)
        }

    }

}
