'use client';

import { useEffect, useState, useTransition, useRef } from 'react';
import { X, Pencil } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User } from '../models';
import { UpdateProfile } from '../actions/actions';

interface UserEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function ProfileEditForm({ isOpen, onClose, user }: UserEditFormProps) {
  const router = useRouter();
  const [isUpdating, startUpdateTransition] = useTransition();
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditFirstName(user.firstName || '');
      setEditLastName(user.lastName || '');
      setEditEmail(user.email || '');
      setEditRole(user.role || '');
      setPreviewAvatar(user.avatar || '');
      setNewAvatarFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setError('');
    }
  }, [isOpen, user]);


  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setNewAvatarFile(null);
    setPreviewAvatar(user.avatar);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleUpdate = () => {
    setError('');

    if (!editFirstName.trim()) {
      setError('Введите имя');
      return;
    }
    if (!editLastName.trim()) {
      setError('Введите фамилию');
      return;
    }
    if (!editEmail.trim()) {
      setError('Введите email');
      return;
    }

    startUpdateTransition(async () => {
      const userData = {
        id: user.id,
        firstName: editFirstName.trim(),
        lastName: editLastName.trim(),
        email: editEmail.trim(),
        role: editRole,
        avatar: newAvatarFile,
      };


      const result = await UpdateProfile(userData);


      if (result.success) {
        handleClose();
        router.refresh();
      } else {
        setError(result.message || 'Произошла ошибка');
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative bg-white rounded-[10px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Редактирование профиля</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Аватар */}
          <div>
            <label className="block text-gray-700 text-lg mb-2">Аватар</label>
            <div className="relative inline-block">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewAvatar} />
              </Avatar>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 text-primary border border-gray-200"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              {newAvatarFile && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-md hover:bg-red-600 text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {newAvatarFile && (
              <p className="text-sm text-green-700 mt-2">
                ✓ Выбран: {newAvatarFile.name} ({(newAvatarFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Имя */}
          <div>
            <label className="block text-gray-700 text-lg mb-2">Имя</label>
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => {
                setEditFirstName(e.target.value);
              }}
              placeholder="Имя..."
              className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Фамилия */}
          <div>
            <label className="block text-gray-700 text-lg mb-2">Фамилия</label>
            <input
              type="text"
              value={editLastName}
              onChange={(e) => {
                setEditLastName(e.target.value);
              }}
              placeholder="Фамилия..."
              className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-lg mb-2">Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => {
                setEditEmail(e.target.value);
              }}
              placeholder="Email..."
              className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Роль */}
          <div>
            <label className="block text-gray-700 text-lg mb-2">Роль</label>
            <input
              type="text"
              value={editRole}
              onChange={(e) => {
                setEditRole(e.target.value);
              }}
              placeholder="Роль..."
              className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-md font-medium disabled:opacity-50"
            >
              {isUpdating ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isUpdating}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}