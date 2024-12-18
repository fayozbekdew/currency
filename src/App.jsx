import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Transactions from "./pages/Transactions";
const Convert = lazy(() => import("./pages/Convert"));
const Statistics = lazy(() => import("./pages/Statistics"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route element={<MainLayout />} path="/">
            <Route index element={<Transactions />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
