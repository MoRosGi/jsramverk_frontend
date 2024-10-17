import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "./components/Layout.js";
import Home from "./components/Home.js";
import Document from './components/Document.js';
import DocumentForm from "./components/DocumentForm.js";
import DocumentEdit from "./components/DocumentEdit.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";


function App() {
  return (
    <HashRouter>
    <h1>SSR-Editor</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Document />}/>
          <Route path="/documentform" element={<DocumentForm />}/>
          <Route path="/documentedit/:id" element={<DocumentEdit />}/>
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/login" element={<LoginForm />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
