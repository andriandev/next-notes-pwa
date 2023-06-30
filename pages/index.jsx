import Link from 'next/link';
import { useContext } from 'react';
import MetaHead from '@/components/shared/meta-head';
import NoteOptions from '@/components/notes/note-options';
import NoteList from '@/components/notes/notes-list';
import NotesContext from '@/context/notes-context';

function Home() {
  const { isLoading } = useContext(NotesContext);

  if (isLoading) {
    return (
      <>
        <MetaHead />
        <p className="text-center my-5">Loading...</p>
      </>
    );
  }

  return (
    <>
      <MetaHead />

      {/* Create Note Button */}
      <div className="d-grid gap-2 col-md-3 mx-auto mb-3">
        <Link href="/note/create" className="btn btn-primary">
          Create Note
        </Link>
      </div>

      {/* Menu Options */}
      <NoteOptions />

      {/* Note List */}
      <NoteList />
    </>
  );
}

export default Home;
