import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import MetaHead from '@/components/shared/meta-head';
import { timeNow } from '@/components/helpers/function';
import { toastOptions } from '@/config/setting';

function CreateNote() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    status: 'publish',
    content: '',
    createdAt: '',
    updatedAt: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // If title empty
    if (formData?.title.length == 0) {
      formData.title = 'Title';
    }

    // Add data
    formData.id = uuidv4();
    formData.createdAt = timeNow();
    formData.updatedAt = timeNow();

    // Get data from localStorage
    const dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];
    dataNotes.push(formData);

    // Set data to localStorage
    localStorage.setItem('dataNotes', JSON.stringify(dataNotes));

    // Toast message
    toast('Note created', toastOptions('success'));

    // Redirect to home
    router.push('/');
  };

  return (
    <>
      <MetaHead title="Create Note" canonical="/note/create" />
      <h1 className="text-center h3 mb-3">Create Note</h1>
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
