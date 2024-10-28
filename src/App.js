import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "./components/Layout.js";
import Document from './components/Document.js';
import DocumentForm from "./components/DocumentForm.js";
import DocumentEdit from "./components/DocumentEdit.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import UserDocuments from "./components/UserDocuments.js";
import AcceptInvite from "./components/AcceptInvite.js";
import Footer from "./components/Footer.js";
import DocumentUpdate from "./components/DocumentUpdate.js";

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <h1>SSR-Editor</h1>
        <Routes>
          {/* Public routes */}
          <Route index element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/invite/:inviteId" element={<AcceptInvite />}/>

          {/* Protected routes */}
          <Route path="/" element={<Layout />}>
            <Route path="/:id" element={<Document />}/>
            <Route path="/documentform" element={<DocumentForm />}/>
            <Route path="/documentedit/:id" element={<DocumentEdit />}/>
            <Route path="/userdocuments" element={<UserDocuments />}/>
            <Route path="/documentupdate/:id" element={<DocumentUpdate />}/>
          </Route>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
