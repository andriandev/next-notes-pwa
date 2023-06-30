import { useContext } from 'react';
import NotesContext from '@/context/notes-context';
import Link from 'next/link';
import { timestampToDatetime } from '@/components/helpers/function';
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
  RecycleIcon,
} from '@/components/shared/icons';

function NoteList() {
  const { noteList, handleAction } = useContext(NotesContext);

  return (
    <>
      {noteList.length == 0 ? (
        <p className="text-center mt-5">Notes Empty</p>
      ) : (
        noteList.map((note) => (
          <div
            className={`card shadow-sm mb-3 ${
              note.status == 'delete' ? 'border-danger' : ''
            }`}
            key={note.id}
          >
            <div className="card-body">
              <p>
                <Link
                  href={`/note/${note.id}`}
                  className="text-decoration-none text-dark"
                >
                  {note.title}
                </Link>
              </p>
              <p className="text-start">
                <small className="text-muted border border-secondary-subtle rounded-pill px-2 py-1">
                  {<ClockIcon className="me-2 mb-1" />}
                  {timestampToDatetime(note.createdAt)}
                </small>
              </p>
              <p className="text-end m-0 p-0">
                <Link
                  href={`/note/edit/${note.id}`}
                  className="btn btn-primary btn-sm me-2"
                  title="Edit Note"
                >
                  {<PencilSquareIcon />}
                </Link>
                <button
                  className={`btn ${
                    note.status == 'delete' ? 'btn-success' : 'btn-danger'
                  } btn-sm`}
                  onClick={() =>
                    handleAction(
                      note.id,
                      note.status == 'delete' ? 'publish' : 'delete'
                    )
                  }
                  title="Delete Note"
                >
                  {note.status == 'delete' ? <RecycleIcon /> : <TrashIcon />}
                </button>
                {note.status == 'delete' ? (
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleAction(note.id, 'deleteForever')}
                    title="Delete Note Forever"
                  >
                    {<TrashIcon />}
                  </button>
                ) : null}
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default NoteList;
