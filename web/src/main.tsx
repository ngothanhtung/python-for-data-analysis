import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import App from './App.tsx';
import BieuDoGiaoBan from './pages/bao-cao/giao-ban/bieu-do.tsx';
import GiaoBan from './pages/bao-cao/giao-ban/thong-ke.tsx';
import NoThue from './pages/bao-cao/no-thue/thong-ke.tsx';
import ToKhai from './pages/bao-cao/to-khai/thong-ke.tsx';
import Home from './pages/home.tsx';
import BieuDo from './pages/bao-cao/no-thue/bieu-do.tsx';
import HangHoaThemMoi from './pages/hang_hoa/them_moi.tsx';
import DanhSachHangHoa from './pages/hang_hoa/danh_sach.tsx';
import TongHopTheoCang from './pages/bao-cao/logistics/tong-hop-theo-cang.tsx';
import BaoCaoHangHoaTheoNhaCungCap from './pages/bao-cao/logistics/thong-ke-hang-hoa-theo-nha-cung-cap.tsx';
import DanhSachLogistics from './pages/bao-cao/logistics/danh-sach.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/bao-cao',
        children: [
          {
            path: '/bao-cao/giao-ban',
            children: [
              {
                path: '/bao-cao/giao-ban/thong-ke',
                element: <GiaoBan />,
              },
              {
                path: '/bao-cao/giao-ban/bieu-do',
                element: <BieuDoGiaoBan />,
              },
            ],
          },
          {
            path: '/bao-cao/to-khai',
            children: [
              {
                path: '/bao-cao/to-khai/thong-ke',
                element: <ToKhai />,
              },
            ],
          },
          {
            path: '/bao-cao/no-thue',
            children: [
              {
                path: '/bao-cao/no-thue/thong-ke',
                element: <NoThue />,
              },
              {
                path: '/bao-cao/no-thue/bieu-do',
                element: <BieuDo />,
              },
            ],
          },
          {
            path: '/bao-cao/logistics',
            children: [
              {
                path: '/bao-cao/logistics/thong-ke-tong-hop-theo-cang',
                element: <TongHopTheoCang />,
              },
            ],
          },
          {
            path: '/bao-cao/logistics',
            children: [
              {
                path: '/bao-cao/logistics/thong-ke-hang-hoa-theo-nha-cung-cap',
                element: <BaoCaoHangHoaTheoNhaCungCap />,
              },
              {
                path: '/bao-cao/logistics/danh-sach',
                element: <DanhSachLogistics />,
              },
            ],
          },
        ],
      },
      {
        path: '/hang_hoa',
        children: [
          {
            path: '/hang_hoa/them_moi',
            element: <HangHoaThemMoi />,
          },
          {
            path: '/hang_hoa/danh_sach',
            element: <DanhSachHangHoa />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
