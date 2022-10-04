import React from 'react';
import './App.css';
import MyProvider from './context/myProvider';
import Table from './componentes/Table';

function App() {
  return (
    <MyProvider>
      <Table />
    </MyProvider>
  );
}

export default App;
