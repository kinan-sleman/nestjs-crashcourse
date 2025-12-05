import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/user/decorators/user.decorator';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(@User("id") currentUserId: number, @Param("username") profileUsername: string) {
    const profile = await this.profileService.getProfile(currentUserId, profileUsername)
    return this.profileService.generateProfileResopnse(profile)
  }
}
