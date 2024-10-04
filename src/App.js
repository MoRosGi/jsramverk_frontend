import React from "react";
// import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Layout from "./components/Layout.js";
import Home from "./components/Home.js";
import Document from './components/Document.js';
import DocumentForm from "./components/DocumentForm.js";
import DocumentEdit from "./components/DocumentEdit.js";

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
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
