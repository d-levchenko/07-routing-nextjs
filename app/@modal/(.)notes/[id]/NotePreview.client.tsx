'use client';

import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import noteService from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface NotePreviewModalProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewModalProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => noteService.fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error || !note) return <div>Something went wrong.</div>;

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview note={note} />
    </Modal>
  );
};

export default NotePreviewClient;
