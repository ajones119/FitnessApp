
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRouter, RouterProvider } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import "./index.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false
    }
  }
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  }

});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} context={{}} />
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              draggablePercent={60}
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
          </QueryClientProvider>
    </>
  )
}

export default App
