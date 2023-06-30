import Link from 'next/link';
import { useContext } from 'react';
import MetaHead from '@/components/shared/meta-head';
import { timestampToDatetime } from '@/components/helpers/function';
import {
  PencilSquareIcon,
  TrashIcon,
  RecycleIcon,
} from '@/components/shared/icons';
import NotesContext from '@/context/notes-context';

function DetailNote() {
  const { dataNote, handleAction, isLoading } = useContext(NotesContext);

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
        canonical={`/note/${dataNote?.id}`}
        index="noindex"
      />
      <div
        className={`card shadow-sm ${
          dataNote?.status == 'delete' ? 'border-danger' : ''
        }`}
      >
        <h5 className="card-header">{dataNote?.title}</h5>
        <div className="card-body">{dataNote?.content}</div>
        <div className="card-footer">
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col my-2">
              <p className="text-start m-0 p-0">
                <Link
                  href={`/note/edit/${dataNote?.id}`}
                  className="btn btn-primary btn-sm me-2"
                  title="Edit Note"
                >
                  {<PencilSquareIcon />}
                </Link>
                <button
                  className={`btn ${
                    dataNote?.status == 'delete' ? 'btn-success' : 'btn-danger'
                  } btn-sm`}
                  onClick={() =>
                    handleAction(
                      dataNote?.id,
                      dataNote?.status == 'delete' ? 'publish' : 'delete',
                      'one'
                    )
                  }
                  title={
                    dataNote?.status == 'delete'
                      ? 'Publish Note'
                      : 'Delete Note'
                  }
                >
                  {dataNote?.status == 'delete' ? (
                    <RecycleIcon />
                  ) : (
                    <TrashIcon />
                  )}
                </button>
                {dataNote?.status == 'delete' ? (
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() =>
                      handleAction(dataNote?.id, 'deleteForever', 'one', '/')
                    }
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
