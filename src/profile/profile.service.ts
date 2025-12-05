import { FollowEneity } from '@/profile/follow.entity';
import { IProfileResponse } from '@/profile/types/profile.interface';
import { ProfileType } from '@/profile/types/profile.type';
import { UserType } from '@/user/types/user.type';
import { UserEntity } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(FollowEneity) private readonly followRespository: Repository<FollowEneity>,
    private readonly userService: UserService
  ) { }

  async getProfile(username: string): Promise<ProfileType> {
    const profile = await this.userService.findByUsername(username);
    return { ...profile, following: false }
  }

  async followProfile(currentUserId: number, username: string): Promise<ProfileType> {
    const followingProfile = await this.userService.findByUsername(username)
    if(followingProfile.id === currentUserId) {
      throw new HttpException("You can't follow yourself!", HttpStatus.BAD_REQUEST)
    }
    const follow = await this.followRespository.findOne({
      where: {
        followerId: currentUserId,
        followingId: followingProfile.id
      }
    })
    if (!follow) {
      const newFollow = new FollowEneity();
      newFollow.followerId = currentUserId;
      newFollow.followingId = followingProfile.id;
      await this.followRespository.save(newFollow);
    }
    return { ...followingProfile, following: true }
  }

  generateProfileResopnse(profile: ProfileType): IProfileResponse {
    delete profile?.password;
    delete profile?.email;
    return {
      profile,
    }
  }
}
