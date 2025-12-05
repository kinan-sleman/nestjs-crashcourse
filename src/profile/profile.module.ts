import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserEntity } from '@/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/user/user.service';
import { FollowEneity } from '@/profile/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEneity])],
  controllers: [ProfileController],
  providers: [ProfileService, UserService],
})
export class ProfileModule {}
