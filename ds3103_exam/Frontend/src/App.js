import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStaff from "./pages/admin/staff/CreateStaff";
import ListStaffPage from "./pages/admin/staff/ListStaff";
import Sidebar from "./components/Sidebar";
import EditStaff from "./pages/admin/staff/UpdateStaff";
import CreateMerch from "./pages/admin/merch/CreateMerch";
import ListMerchPage from "./pages/admin/merch/ListMerch";
import EditMerch from "./pages/admin/merch/UpdateMerch";
import Navbar from "./components/Navbar";
import MerchPage from "./pages/Merch";
import { CartProvider } from "./contexts/Context";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<ListStaffPage canEdit={false} />} />
            <Route path="merch" element={<MerchPage canEdit={false} canAddToCart={true} canAddAndRemove={false} />} />
            <Route path="cart" element={<ShoppingCart />} />
          </Route>
          <Route path="/admin" element={<Sidebar />}>
            <Route path="staff">
              <Route index element={<ListStaffPage canEdit={true} />} />
              <Route path="create" element={<CreateStaff />} />
              <Route path="edit/:id" element={<EditStaff />} />
            </Route>
            <Route path="merch">
              <Route index element={<ListMerchPage canEdit={true} canAddToCart={false} />} />
              <Route path="create" element={<CreateMerch />} />
              <Route path="edit/:id" element={<EditMerch />} />
            </Route>
          </Route>
          <Route path="*" element={<div>Page Not Found</div>}></Route>


        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
