import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';


/*const router = createBrowserRouter([
  //{ path: "/keitering", element: <Keitering /> },
  { path: "", element: <Keitering /> },
  { path: "/admin", element: <Admin /> },
  { path: "/admin/*", element: <PageNotFound back={"admin"} /> },
  { path: "*", element: <PageNotFound back={""} /> },
  { path: "/admin/orders/:type", element: <Orders /> }
])*/

ReactDOM.createRoot(document.querySelector('body')).render(
  <BrowserRouter basename='/keitering'>
    <App />
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
