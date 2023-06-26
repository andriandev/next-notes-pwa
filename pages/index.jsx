import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetaHead from '@/components/shared/meta-head';
import { timeNow, timestampToDatetime } from '@/components/helpers/function';
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
  RecycleIcon,
} from '@/components/shared/icons';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [noteList, setNoteList] = useState([]);
  const [options, setOptions] = useState({
    filterStatus: 'publish',
    filterSort: 'DESC',
  });

  useEffect(() => {
    fetchData();
  }, [options]);

  const fetchData = () => {
    // Get data from localStorage
    let dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Filter dataNotes
    dataNotes = dataNotes.filter(
      (note) => note?.status == options?.filterStatus
    );

    if (options?.filterSort == 'DESC') {
      // Sort DESC
      dataNotes = dataNotes.reverse();
    }

    // Set state
    setNoteList(dataNotes);
    setIsLoading(false);
  };

  const statusOptions = (status) => {
    if (status == 'publish') return 'delete';
    if (status == 'delete') return 'publish';
  };

  const handleAction = (id, action) => {
    // Get data from localStorage
    let dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Get index data
    const objIndex = dataNotes.findIndex((note) => note.id == id);

    if (action == 'deleteForever') {
      // Remove note
      dataNotes.splice(objIndex, 1);
    } else {
      // Edit "status"
      dataNotes[objIndex].status = action;

      // Edit "updatedAt"
      dataNotes[objIndex].updatedAt = timeNow();
    }

    // Save new notes
    localStorage.setItem('dataNotes', JSON.stringify(dataNotes));

    // Message and toast type
    let message;
    let toastType = 'info';

    if (action == 'delete') {
      message = 'Note deleted';
      toastType = 'info';
    } else if (action == 'deleteForever') {
      message = 'Note deleted forever';
      toastType = 'info';
    } else {
      message = 'Note published';
      toastType = 'success';
    }

    // Toast message
    toast(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      closeButton: false,
      type: toastType,
    });

    // Fetch data notes
    fetchData();
  };

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
      <div className="d-grid gap-2 col-md-3 mx-auto mb-3">
        <Link href="/note/create" className="btn btn-primary">
          Create Note
        </Link>
      </div>

      {/* Menu Options */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          {/* Switch Publish */}
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="showPublishNote"
              checked={options?.filterStatus == 'publish' ? true : false}
              onChange={() =>
                setOptions((prev) =>
                  Object.assign(
                    { ...prev },
                    {
                      filterStatus: statusOptions(options?.filterStatus),
                    }
                  )
                )
              }
            />
            <label className="form-check-label" htmlFor="showPublishNote">
              Show published notes
            </label>
          </div>

          {/* Switch Delete */}
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="showDeleteNote"
              checked={options?.filterStatus == 'delete' ? true : false}
              onChange={() =>
                setOptions((prev) =>
                  Object.assign(
                    { ...prev },
                    {
                      filterStatus: statusOptions(options?.filterStatus),
                    }
                  )
                )
              }
            />
            <label className="form-check-label" htmlFor="showDeleteNote">
              Show deleted notes
            </label>
          </div>

          {/* Switch Filter Sort */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="sortNotes"
              checked={options?.filterSort == 'DESC' ? true : false}
              onChange={() =>
                setOptions((prev) =>
                  Object.assign(
                    { ...prev },
                    {
                      filterSort:
                        options?.filterSort == 'DESC' ? 'ASC' : 'DESC',
                    }
                  )
                )
              }
            />
            <label className="form-check-label" htmlFor="sortNotes">
              Sort by time ({options?.filterSort})
            </label>
          </div>
        </div>
      </div>

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

export default Home;
