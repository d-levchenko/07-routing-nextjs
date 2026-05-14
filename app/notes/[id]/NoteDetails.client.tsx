'use client';

import { useQuery } from '@tanstack/react-query';
import noteService from '@/lib/api';

import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  id: string;
}

const NoteDetails = ({ id }: NoteDetailsProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => noteService.fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return (
      <p>{error instanceof Error ? error.message : 'Something went wrong'}</p>
    );

  if (!data) return <p>Something went wrong</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
