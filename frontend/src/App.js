import "./Styles/newList.css";
import All from "./TodoList/All";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import Still from "./TodoList/Still";
import Container from "./TodoList/Container";
import Done from "./TodoList/Done";
import { NewListProvider } from "./Contexts/NewListContext";
import Toast from "./Modals/Toast";
import { ToastProvider } from "./Contexts/toastContext";
import CommonModal from "./Modals/CommonModal"
import  {ModalProvider}  from "./Contexts/CommonModalContext";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Container />}>
        <Route index element={<All />} />
        <Route path="all" element={<All />} />
        <Route path="done" element={<Done />} />
        <Route path="still" element={<Still />} />
      </Route>
    )
  );

  return (
    <NewListProvider>
      <ModalProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <Toast />
          <CommonModal />
        </ToastProvider>
      </ModalProvider>
    </NewListProvider>
  );
}

export default App;
