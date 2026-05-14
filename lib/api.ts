import axios from 'axios';
import type { Note } from '../types/note';

interface NotehubResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: `https://notehub-public.goit.study/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
): Promise<NotehubResponse> => {
  const { data } = await api.get<NotehubResponse>(`/notes`, {
    params: { search, page, perPage },
  });

  return data;
};

const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteProps): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', { title, content, tag });
  return data;
};

const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};

const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);

  return data;
};

const noteService = { fetchNotes, createNote, deleteNote, fetchNoteById };

export default noteService;
