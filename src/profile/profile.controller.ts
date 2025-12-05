import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/user/decorators/user.decorator';
import { AuthGuard } from '@/user/guards/auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get(':username')
  @UseGuards(AuthGuard)
  async getProfile(@Param("username") profileUsername: string) {
    const profile = await this.profileService.getProfile(profileUsername)
    return this.profileService.generateProfileResopnse(profile)
  }
  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async follow(@User("id") currentUserId: number, @Param("username") followingUsername: string) {
    const newFollow = await this.profileService.followProfile(currentUserId, followingUsername)
    return this.profileService.generateProfileResopnse(newFollow)
  }
}
