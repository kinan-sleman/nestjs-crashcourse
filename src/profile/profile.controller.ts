import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/user/decorators/user.decorator';
import { AuthGuard } from '@/user/guards/auth.guard';
import { IProfileResponse } from '@/profile/types/profile.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get(':username')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user profile' })
  @ApiResponse({ status: 200, description: 'Return profile details.' })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  async getProfile(@User("id") currentUserId: number, @Param("username") profileUsername: string): Promise<IProfileResponse> {
    const profile = await this.profileService.getProfile(currentUserId, profileUsername)
    return this.profileService.generateProfileResopnse(profile)
  }
  @Post(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user' })
  @ApiResponse({ status: 200, description: 'Return profile details.' })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  async follow(@User("id") currentUserId: number, @Param("username") followingUsername: string): Promise<IProfileResponse> {
    const newFollow = await this.profileService.followProfile(currentUserId, followingUsername)
    return this.profileService.generateProfileResopnse(newFollow)
  }
  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiResponse({ status: 200, description: 'Unfollow action completed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async unFollow(@User("id") currentUserId: number, @Param("username") followingUsername: string): Promise<IProfileResponse> {
    const unfollowedProfile = await this.profileService.unfollowProfile(currentUserId, followingUsername)
    return this.profileService.generateProfileResopnse(unfollowedProfile)
  }
}
