import {FC} from 'react';
import { Card } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import type { ProfileMiniPreviewProps } from '../interface';
import FieldRow from '@/common/components/client_components/ProfileUI/Delivery/components/FieldRow';

const ProfileMiniPreview: FC<ProfileMiniPreviewProps> = ({ user }) => {
  const name = user?.name || '';
  const surname = user?.surname || '';
  const email = user?.email || '';

  return (
    <div className="profile-preview-outer">
      {/* Usar la misma clase `profile-card` para que tenga el mismo fondo que la tarjeta de Perfil */}
      <Card className="profile-card" bordered={false} bodyStyle={{ padding: 0 }}>
        <div className="profile-preview-inner">
          <div style={{ padding: '12px' }}>
            {/* Usamos el mismo formato que ProfileInfoCard */}
            <FieldRow label="Nombre" value={name} icon={<UserOutlined />} />
            <FieldRow label="Apellido" value={surname} icon={<UserOutlined />} />
            <FieldRow label="Email" value={email} icon={<MailOutlined />} />
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