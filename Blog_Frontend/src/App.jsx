import { BrowserRouter, Routes, Route } from "react-router-dom";
// here we require our all pages for routing
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPostPage";
import CreateEditPost from "./pages/CreateEditPost";
import PostManagement from "./pages/PostManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/post/:id" element={<CreateEditPost />} />
        <Route path="/manage" element={<PostManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
