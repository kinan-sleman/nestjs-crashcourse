import { IProfileResponse } from '@/profile/types/profile.interface';
import { ProfileType } from '@/profile/types/profile.type';
import { UserType } from '@/user/types/user.type';
import { UserEntity } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: UserEntity,
    private readonly userService: UserService
  ) { }

  async getProfile(currentUserId, username): Promise<ProfileType> {
    const profile = await this.userService.findById(currentUserId);
    delete profile?.password;
    delete profile?.email;
    return { ...profile, following: false }
  }

  generateProfileResopnse(profile: ProfileType): IProfileResponse {
    return {
      profile,
    }
  }
}
