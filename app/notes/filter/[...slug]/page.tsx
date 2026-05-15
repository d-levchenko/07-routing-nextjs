import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

import noteService from '@/lib/api';
import NotesClient from './Notes.client';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

const FilterPage = async ({ params }: FilterPageProps) => {
  type TAGS = 'Work' | 'Personal' | 'Todo' | 'Shopping' | 'Meeting';
  const queryClient = new QueryClient();

  const { slug } = await params;

  const currentTag = slug?.[0];
  const selectedTag =
    !currentTag || currentTag === 'all' ? undefined : currentTag;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', selectedTag],
    queryFn: () =>
      noteService.fetchNotes(
        '',
        1,
        12,
        selectedTag && selectedTag !== 'all'
          ? (selectedTag as TAGS)
          : undefined,
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default FilterPage;
