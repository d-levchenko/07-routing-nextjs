import noteService from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import NotePreviewClient from './NotePreview.client';

interface NotePreviewModalProps {
  params: Promise<{ id: string }>;
}

const NotePreviewModal = async ({ params }: NotePreviewModalProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => noteService.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewModal;
