import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
    constructor(@InjectModel("Property") private readonly propertyModel: Model<void>) { }
}
