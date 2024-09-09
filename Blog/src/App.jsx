import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />





        </Routes>
      </BrowserRouter>
      <h1 className="bg-red-600">hello</h1>
    </>
  )
}

export default App
