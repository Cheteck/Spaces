import { UserPermissions, UserSettings, ProfileVisibility } from '../types';

export function getUserPermissions(params: {
  viewerId?: string;
  profileId: string;
  visibility: ProfileVisibility;
  isFollowing: boolean;
  userSettings: UserSettings;
}): UserPermissions {
  const isOwner = params.viewerId === params.profileId;
  const canSeeAll = isOwner;

  const isPublic = params.visibility === 'PUBLIC';
  const isFollowersOnly = params.visibility === 'FOLLOWERS_ONLY' && params.isFollowing;

  const baseAccess = canSeeAll || isPublic || isFollowersOnly;

  return {
    canSeeFullProfile: baseAccess,
    canSeePosts: baseAccess,
    canSeeExperience: baseAccess && params.userSettings.showExperience,
    canSeeEducation: baseAccess && params.userSettings.showEducation,
    canSeeSkills: baseAccess && params.userSettings.showSkills,
    canSeeSpaces: baseAccess && params.userSettings.showSpaces,
    canSeeContactInfo: baseAccess && (params.userSettings.showEmail || params.userSettings.showPhoneNumber),
    canMessage: params.viewerId !== undefined && !isOwner
  };
}
