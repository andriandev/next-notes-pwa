import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MetaHead from '@/components/shared/meta-head';
import { timeNow, timestampToDatetime } from '@/components/helpers/function';
import {
  PencilSquareIcon,
  TrashIcon,
  RecycleIcon,
} from '@/components/shared/icons';

function DetailNote() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataNote, setDataNote] = useState();

  const router = useRouter();
  const idNote = router.query.id;

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const fetchData = () => {
    // Get data from localStorage
    const dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Remove duplicate id
    const seen = new Set();
    const dataNotesFilter = dataNotes.filter((note) => {
      const duplicate = seen.has(note?.id);
      seen.add(note?.id);
      return !duplicate;
    });

    // Find by id
    const noteDetail = dataNotesFilter.find((note) => note?.id == idNote);

    // If note not found
    if (!noteDetail || dataNotes.length == 0) {
      // Redirect 404 page
      router.replace('/not-found');
    } else {
      // Set state
      setDataNote(noteDetail);
      setIsLoading(false);
    }
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

    if (action == 'deleteForever') {
      router.push('/');
    } else {
      // Fetch data notes
      fetchData();
    }
  };

  if (isLoading) {
    return (
      <>
        <MetaHead index="noindex" />
        <p className="text-center my-5">Loading...</p>
      </>
    );
  }

  return (
    <>
      <MetaHead
        title={dataNote?.title}
        description={dataNote?.content}
        canonical={`/note/${dataNote.id}`}
        index="noindex"
      />
      <div
        className={`card shadow-sm ${
          dataNote.status == 'delete' ? 'border-danger' : ''
        }`}
      >
        <h5 className="card-header">{dataNote?.title}</h5>
        <div className="card-body">{dataNote?.content}</div>
        <div className="card-footer">
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col my-2">
              <p className="text-start m-0 p-0">
                <Link
                  href={`/note/edit/${dataNote.id}`}
                  className="btn btn-primary btn-sm me-2"
                  title="Edit Note"
                >
                  {<PencilSquareIcon />}
                </Link>
                <button
                  className={`btn ${
                    dataNote.status == 'delete' ? 'btn-success' : 'btn-danger'
                  } btn-sm`}
                  onClick={() =>
                    handleAction(
                      dataNote.id,
                      dataNote.status == 'delete' ? 'publish' : 'delete'
                    )
                  }
                  title={
                    dataNote.status == 'delete' ? 'Publish Note' : 'Delete Note'
                  }
                >
                  {dataNote.status == 'delete' ? (
                    <RecycleIcon />
                  ) : (
                    <TrashIcon />
                  )}
                </button>
                {dataNote.status == 'delete' ? (
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleAction(dataNote.id, 'deleteForever')}
                    title="Delete Note Forever"
                  >
                    {<TrashIcon />}
                  </button>
                ) : null}
              </p>
            </div>
            <div className="col text-end">
              <small className="text-muted">
                {'Created at : ' + timestampToDatetime(dataNote?.createdAt)}
              </small>
              <br />
              <small className="text-muted">
                {'Updated at : ' + timestampToDatetime(dataNote?.updatedAt)}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailNote;
