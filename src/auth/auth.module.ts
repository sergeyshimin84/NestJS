import { RolesGuard } from './role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AuthService, 
        LocalStrategy, 
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
