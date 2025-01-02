import { BrowserRouter, Routes, Route } from "react-router-dom";
// here we require our all pages for routing
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPostPage";
import CreateEditPost from "./pages/CreateEditPost";
import PostManagement from "./pages/PostManagement";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/view/:id" element={<BlogPost />} />
        <Route path="/post/create" element={<CreateEditPost />} />
        <Route path="/post/edit/:id" element={<CreateEditPost />} />
        <Route path="/post/manage" element={<PostManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
