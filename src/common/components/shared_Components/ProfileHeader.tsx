interface ProfileHeaderProps {
  name: string
  surname: string
  email: string
}

export default function ProfileHeader({ name, surname, email }: ProfileHeaderProps) {
  return (
    <div className="profile-hero">
      <div className="profile-hero-left">
        <div className="profile-avatar">
          {name?.[0] ?? 'U'}
        </div>
        <div>
          <h2 className="profile-name">{name} {surname}</h2>
          <p className="profile-email">{email}</p>
        </div>
      </div>
      <div className="profile-actions">
      </div>
    </div>
  )
}