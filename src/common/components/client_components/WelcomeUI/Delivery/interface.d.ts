export interface ProfileMiniPreviewProps {
  user: Pick<UserProfile, 'name' | 'surname'>;
}

export interface GridProps {
  full?: boolean;
  userPreview?: { name: string; surname: string };
}