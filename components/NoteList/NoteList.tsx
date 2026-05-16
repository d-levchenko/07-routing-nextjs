'use client';

import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import noteService from '../../lib/api';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    mutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map(elem => (
        <li key={elem.id} className={css.listItem}>
          <h2 className={css.title}>{elem.title}</h2>
          <p className={css.content}>{elem.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{elem.tag}</span>
            <Link className={css.link} href={`/notes/${elem.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(elem.id)}
              disabled={mutation.isPending}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
