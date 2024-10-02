import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Layout from "./components/Layout.js";
import Home from "./components/Home.js";
import Document from './components/Document.js';
import DocumentForm from "./components/DocumentForm.js";
import DocumentEdit from "./components/DocumentEdit.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Document />}/>
          <Route path="/documentform" element={<DocumentForm />}/>
          <Route path="/documentedit/:id" element={<DocumentEdit />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
