import "./App.css";
import "./index.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationsList from "./components/LocationsList";
import { Route, Routes } from "react-router-dom";
import HotelsLayout from "./components/HotelsLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarksLayout from "./components/Bookmark/BookmarksLayout";
import BookmarksProvider from "./components/context/bookmarksProvider";
import SingleBookmark from "./components/Bookmark/SingleBookmark";
import Bookmarks from "./components/Bookmark/Bookmarks";
import AddNewBookmark from "./components/Bookmark/AddNewBookmark";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/login-logout/login";
import ProtectedRoute from "./components/login-logout/ProtectedRoute";
function App() {
  const pathname = window.location.pathname;
  console.log(pathname);

  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          {pathname === "/login" ? null : <Header />}
          <Routes>
            <Route path="/" element={<LocationsList />}></Route>
            <Route path="/hotels" element={<HotelsLayout />}>
              <Route index element={<Hotels />}></Route>
              <Route path=":id" element={<SingleHotel />}></Route>
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarksLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmarks />}></Route>
              <Route path=":id" element={<SingleBookmark />}></Route>
              <Route path="add" element={<AddNewBookmark />}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
