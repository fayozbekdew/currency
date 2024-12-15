import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import { Convert, Home, Transactions } from "./pages"


function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>} path='/' >
          <Route index element={<Home/>}/>
          <Route path="/convert" element={<Convert/>}/>
          <Route path="/transaction" element={<Transactions/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
