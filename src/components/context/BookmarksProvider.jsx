import { createContext, useContext, useEffect, useReducer } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext(null);
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Action Not Available!");
  }
}

export default function BookmarksProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const { data } = await axios.get(`http://localhost:5000/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "bookmarks/loaded", payload: [] });
        toast.error(err?.message);
      }
    }

    fetchData();
  }, []);
  async function getBookmark(id) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function createBookmark(newBookmark) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.post(
        `http://localhost:5000/bookmarks`,
        newBookmark
      );
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function deleteBookmark(id) {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
