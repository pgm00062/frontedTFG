export interface ProfileMiniPreviewProps {
  user: Pick<UserProfile, 'name' | 'surname'>;
}

export interface GridProps {
  full?: boolean;
  userPreview?: { name: string; surname: string };
}

export interface Props {
  index: number;
  className?: string;
  title: string;
  icon: string;
  onToggle: () => void;
  expanded: boolean;
  href?: string;
  userPreview?: { name: string; surname: string };
}


export interface PropsGridFull {
  expanded: number | null;
  onToggle: (i: number) => void;
  userPreview?: { name: string; surname: string };
}