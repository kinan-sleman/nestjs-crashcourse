import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/user/decorators/user.decorator';
import { AuthGuard } from '@/user/guards/auth.guard';
import { IProfileResponse } from '@/profile/types/profile.interface';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get(':username')
  @UseGuards(AuthGuard)
  async getProfile(@User("id") currentUserId: number, @Param("username") profileUsername: string): Promise<IProfileResponse> {
    const profile = await this.profileService.getProfile(currentUserId, profileUsername)
    return this.profileService.generateProfileResopnse(profile)
  }
  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async follow(@User("id") currentUserId: number, @Param("username") followingUsername: string): Promise<IProfileResponse> {
    const newFollow = await this.profileService.followProfile(currentUserId, followingUsername)
    return this.profileService.generateProfileResopnse(newFollow)
  }
  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unFollow(@User("id") currentUserId: number, @Param("username") followingUsername: string): Promise<IProfileResponse> {
    const unfollowedProfile = await this.profileService.unfollowProfile(currentUserId, followingUsername)
    return this.profileService.generateProfileResopnse(unfollowedProfile)
  }
}
