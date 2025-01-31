import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import FrontStore from './pages/FrontStore';

function App() {
  return (
    <BrowserRouter basename="/React_week5">
      <Routes>
        {/* 前台路由 */}
        <Route path="/*" element={<FrontStore />} />
        
        {/* 後台路由 */}
        <Route path="/admin/*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
