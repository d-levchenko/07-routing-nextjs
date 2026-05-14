import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import noteService from '@/lib/api';
import NoteDetails from './NoteDetails.client';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

const NotePageDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => noteService.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
};

export default NotePageDetails;
