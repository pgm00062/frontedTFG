import { message } from 'antd';

export async function handleChange({
  oldPassword,
  newPassword,
  setChanging,
  setOldPassword,
  setNewPassword,
  setShow,
}: {
  oldPassword: string;
  newPassword: string;
  setChanging: (b: boolean) => void;
  setOldPassword: (s: string) => void;
  setNewPassword: (s: string) => void;
  setShow: (b: boolean) => void;
}) {
  if (!oldPassword || !newPassword) {
    return message.warning('Introduce la contraseña antigua y la nueva');
  }
  try {
    setChanging(true);
    const res = await fetch('/api/user/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const json = await res.json();
    if (!res.ok || !json?.ok) throw new Error(json?.message || 'No se pudo cambiar la contraseña');
    message.success('Contraseña actualizada correctamente');
    setOldPassword('');
    setNewPassword('');
    setShow(false);
  } catch (e: any) {
    message.error(e?.message || 'Error al cambiar la contraseña');
  } finally {
    setChanging(false);
  }
}