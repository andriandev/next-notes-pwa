import { useContext } from 'react';
import NotesContext from '@/context/notes-context';

function NoteOptions() {
  const { options, setOptions } = useContext(NotesContext);

  const statusOptions = (status) => {
    if (status == 'publish') return 'delete';
    if (status == 'delete') return 'publish';
  };

  return (
    <>
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
    </>
  );
}

export default NoteOptions;
