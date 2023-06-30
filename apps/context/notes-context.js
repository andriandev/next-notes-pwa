import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastOptions } from '@/config/setting';
import { timeNow } from '@/components/helpers/function';

const NotesContext = createContext();

export const NotesProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [noteList, setNoteList] = useState([]);
  const [dataNote, setDataNote] = useState();
  const [options, setOptions] = useState({
    filterStatus: 'publish',
    filterSort: 'DESC',
  });

  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      fetchAllData();
    }
  }, [options, router]);

  useEffect(() => {
    if (router.isReady && router.pathname == '/note/[id]') {
      fetchData();
    }
  }, [router.isReady, router.query?.id]);

  const fetchData = (id) => {
    // Get data from localStorage
    const dataNotes = JSON.parse(localStorage.getItem('dataNotes')) || [];

    // Get note id
    const noteId = router.query?.id ? router.query?.id : id;

    // Remove duplicate id
    const seen = new Set();
    const dataNotesFilter = dataNotes.filter((note) => {
      const duplicate = seen.has(note?.id);
      seen.add(note?.id);
      return !duplicate;
    });

    // Find by id
    const noteDetail = dataNotesFilter.find((note) => note?.id == noteId);

    if (!noteDetail) {
      // Redirect 404 page
      router.replace('/not-found');
    }

    // Set state
    setDataNote(noteDetail);
    setIsLoading(false);
  };

  const fetchAllData = () => {
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

  const handleAction = (id, action, fetch = 'all', redirect = false) => {
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
    toast(message, toastOptions(toastType));

    if (action == 'deleteForever' && redirect) {
      router.push(redirect);
    } else {
      // Fetch data notes
      fetch == 'all' ? fetchAllData() : fetchData();
    }
  };

  return (
    <NotesContext.Provider
      value={{
        noteList,
        dataNote,
        options,
        setOptions,
        handleAction,
        isLoading,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
