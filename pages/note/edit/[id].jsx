import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import MetaHead from '@/components/shared/meta-head';
import { timeNow } from '@/components/helpers/function';
import { toastOptions } from '@/config/setting';

function CreateNote() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (router.isReady) {
      fetchData(router.query.id);
    }
  }, [router.isReady]);

  const fetchData = (idNote) => {
    // Get data from localStorage
    let dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Find by id
    dataNotes = dataNotes.find((note) => note.id == idNote);

    // If note doesn't exist
    if (!dataNotes || dataNotes.length == 0) {
      router.push('/not-found');
    } else {
      // Set state
      setFormData(dataNotes);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If title empty
    if (formData?.title.length == 0) {
      formData.title = 'Title';
    }

    // Get data from localStorage
    const dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Get index data
    const objIndex = dataNotes.findIndex((note) => note.id == router.query.id);

    // Update note
    dataNotes[objIndex].title = formData?.title;
    dataNotes[objIndex].status = formData?.status;
    dataNotes[objIndex].content = formData?.content;
    dataNotes[objIndex].updatedAt = timeNow();

    // Set data to localStorage
    localStorage.setItem('dataNotes', JSON.stringify(dataNotes));

    // Toast message
    toast('Note updated', toastOptions('success'));

    // Redirect to home
    router.push('/');
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
      <MetaHead title="Edit Note" canonical={`/note/edit`} />
      <h1 className="text-center h3 mb-3">Edit Note</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                type="text"
                className="form-control"
                placeholder="Title"
                rows="2"
                required
                value={formData?.title}
                onChange={(e) =>
                  setFormData((prev) =>
                    Object.assign({ ...prev }, { title: e.target.value })
                  )
                }
              />
            </div>

            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="publish"
                  value="publish"
                  checked={formData.status == 'publish' ? true : false}
                  onChange={(e) =>
                    setFormData((prev) =>
                      Object.assign({ ...prev }, { status: e.target.value })
                    )
                  }
                />
                <label className="form-check-label" htmlFor="publish">
                  Publish
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="delete"
                  value="delete"
                  checked={formData.status == 'delete' ? true : false}
                  onChange={(e) =>
                    setFormData((prev) =>
                      Object.assign({ ...prev }, { status: e.target.value })
                    )
                  }
                />
                <label className="form-check-label" htmlFor="delete">
                  Delete
                </label>
              </div>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Content"
                rows="3"
                value={formData?.content}
                onChange={(e) =>
                  setFormData((prev) =>
                    Object.assign({ ...prev }, { content: e.target.value })
                  )
                }
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateNote;
