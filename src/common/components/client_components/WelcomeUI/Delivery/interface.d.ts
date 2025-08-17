export interface ProfileMiniPreviewProps {
  user?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
}

export interface GridProps {
  full?: boolean;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
}

export interface Props {
  index: number;
  className?: string;
  title: string;
  icon: string;
  onToggle: () => void;
  expanded: boolean;
  href?: string;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
}


export interface PropsGridFull {
  expanded: number | null;
  onToggle: (i: number) => void;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
}