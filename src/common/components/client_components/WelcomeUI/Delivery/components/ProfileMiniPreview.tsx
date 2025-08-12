import {FC} from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ProfileMiniPreviewProps } from '../interface';

const ProfileMiniPreview: FC<ProfileMiniPreviewProps> = ({ user }) => {
  return (
    <div className="profile-preview-outer">
      <Card className="profile-preview-card" bordered={false} bodyStyle={{ padding: 0 }}>
        <div className="profile-preview-inner">
          <Avatar
            size={80}
            className="profile-preview-avatar"
            icon={<UserOutlined />}
          >
            {user.name?.[0]?.toUpperCase() ?? 'U'}
          </Avatar>
          <div className="profile-preview-name">
            {user.name} {user.surname}
          </div>
          <div className="profile-preview-welcome">
            ¡Bienvenido de nuevo!
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileMiniPreview;