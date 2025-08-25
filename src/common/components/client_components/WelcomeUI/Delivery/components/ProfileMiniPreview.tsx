import {FC} from 'react';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import type { ProfileMiniPreviewProps } from '../interface';
import FieldRow from '@/common/components/client_components/ProfileUI/Delivery/components/FieldRow';

const ProfileMiniPreview: FC<ProfileMiniPreviewProps> = ({ user }) => {
  
  const name = user?.name || '';
  const surname = user?.surname || '';
  const email = user?.email || '';

  return (
    <div className="profile-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="profile-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            {/* Usamos el mismo formato que ProfileInfoCard */}
            <FieldRow label="Nombre" value={name} icon={<UserOutlined />} />
            <FieldRow label="Apellido" value={surname} icon={<UserOutlined />} />
            <FieldRow label="Email" value={email} icon={<MailOutlined />} />
          </div>

          <div className="profile-preview-welcome" style={{ 
            marginTop: '16px',
            padding: '12px',
            textAlign: 'center',
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
            borderRadius: '6px'
          }}>
            ¡Bienvenido de nuevo!
          </div>
        </div>
    </div>
  );
};

export default ProfileMiniPreview;