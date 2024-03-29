import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/Authentication/RequireAuth";
import M_Dashboard from "./pages/M_Dashboard";
import S_Dashboard from "./pages/S_Dashboard";
import A_Dashboard from "./pages/A_Dashboard";
import AddBoard from "./pages/AddBoard";
import Rules from "./pages/Rules";
import Result from "./pages/Result";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import Edit_Result from "./pages/Edit_Result";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import InActivePage from "./pages/InActivePage";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import SearchList from "./pages/SearchList";

function App() {
  return (
    <Routes>
      {/* <Route path="/landing" element={<LandingPage />} /> */}
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" element={<Login choose={0} />} />
      <Route path="/login-student" element={<Login choose={1} />} />
      <Route path="/login-teacher" element={<Login choose={2} />} />
      <Route path="/login-admin" element={<Login choose={3} />} />
      <Route path="/register" element={<Register choose={0} />} />
      <Route path="/register-student" element={<Register choose={1} />} />
      <Route path="/register-teacher" element={<Register choose={2} />} />

      <Route path="/student/join-group" element={<Register choose={3} />} />
      <Route path="/student/create-group" element={<Register choose={4} />} />

      <Route path="/group/:groupid">
        <Route
          index={true}
          element={
            <RequireAuth>
              <S_Dashboard choose={0} />
            </RequireAuth>
          }
        />
        <Route
          path="project/:projectid"
          index={true}
          element={
            <RequireAuth>
              <S_Dashboard choose={0} />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/project/:id/create-board">
        <Route
          path=":templateid/rules"
          index={true}
          element={
            <RequireAuth>
              <Rules />
            </RequireAuth>
          }
        />
        <Route
          path=":templateid/template"
          index={true}
          element={
            <RequireAuth>
              <AddBoard />
            </RequireAuth>
          }
        />
        <Route
          path=":boardid/result"
          index={true}
          element={
            <RequireAuth>
              <Result />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/board/:id">
        <Route
          index={true}
          element={
            <RequireAuth>
              <ViewBoard />
            </RequireAuth>
          }
        />
        <Route
          path="edit"
          index={true}
          element={
            <RequireAuth>
              <EditBoard />
            </RequireAuth>
          }
        />
        <Route
          path="edit/result"
          index={true}
          element={
            <RequireAuth>
              <Edit_Result />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/teacher/:id">
        <Route
          index={true}
          exact
          element={
            <RequireAuth>
              <M_Dashboard choose={0} />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/classroom/:id">
        <Route
          index={true}
          exact
          element={
            <RequireAuth>
              <M_Dashboard choose={1} />
            </RequireAuth>
          }
        />
        <Route
          path="group/:groupid"
          index={true}
          exact
          element={
            <RequireAuth>
              <M_Dashboard choose={2} />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/admin">
        <Route
          index={true}
          exact
          element={
            <RequireAuth>
              <A_Dashboard choose={0} />
            </RequireAuth>
          }
        />
        {/* <Route
          path="active"
          index={true}
          exact
          element={
            <RequireAuth>
              <A_Dashboard choose={1} />
            </RequireAuth>
          }
        /> */}
        <Route
          path="active/group/:groupid"
          index={true}
          exact
          element={
            <RequireAuth>
              <A_Dashboard choose={3} />
            </RequireAuth>
          }
        />
        <Route
          path="add-template"
          index={true}
          exact
          element={
            <RequireAuth>
              <AddTemplate />
            </RequireAuth>
          }
        />
        <Route
          path="template/:id"
          index={true}
          exact
          element={
            <RequireAuth>
              <EditTemplate />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/all_projects"
        index={true}
        exact
        element={
          <RequireAuth>
            <InActivePage />
          </RequireAuth>
        }
      />
      <Route
        path="/search"
        index={true}
        exact
        element={
          <RequireAuth>
            <SearchList />
          </RequireAuth>
        }
      />
      <Route
        path="/search-project/:id"
        index={true}
        exact
        element={
          <RequireAuth>
            <SearchPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
