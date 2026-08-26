import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './libs/types/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      uploads: true,
      autoSchemaFile: true,
      formatError: (errors: T) => {
        const graphQLFormattedError = {
          extensions: { code: errors?.extensions?.code },  // BOSHQA YAXSHIROQ VARIANT TOPILMADI
          message: errors?.extensions?.exception?.response?.message || errors?.extensions?.response?.message || errors?.message,
        };
        console.log("GRAPHQL GLOBAL ERROR", graphQLFormattedError)
        return graphQLFormattedError
      }
    }),
    ComponentsModule, DatabaseModule],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
