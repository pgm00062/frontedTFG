import { Card } from 'antd'
import { IdcardOutlined, UserOutlined, MailOutlined, NumberOutlined } from '@ant-design/icons'
import FieldRow from './FieldRow'
import type {ProfileInfoCardProps} from '../interface'

export default function ProfileInfoCard({ data, onEdit }: ProfileInfoCardProps) {
  return (
    <Card className="profile-card">
      <h1 className="profile-title">Información de cuenta</h1>
      <div className="profile-rows">
        <FieldRow label="ID" value={data.id} icon={<NumberOutlined />} />
        <FieldRow label="Nombre" value={data.name} icon={<UserOutlined />} />
        <FieldRow label="Apellido" value={data.surname} icon={<UserOutlined />} />
        <FieldRow label="Email" value={data.email} icon={<MailOutlined />} />
        <FieldRow label="DNI" value={data.dni} icon={<IdcardOutlined />} />
      </div>
      <div className="profile-actions-bottom">
        <button className="btn-full-lg" onClick={onEdit}>Editar</button>
      </div>
    </Card>
  )
}