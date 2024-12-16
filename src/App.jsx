import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
const Convert = lazy(() => import("./pages/Convert"));
const Transactions = lazy(() => import("./pages/Transactions"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route element={<MainLayout />} path="/">
            <Route index element={<Home />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/transaction" element={<Transactions />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
