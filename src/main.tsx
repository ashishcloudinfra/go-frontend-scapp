import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import ErrorBoundary from './ErrorBoundary.tsx'
// import { injectStore } from './goFetch.ts'

// injectStore(store.getState());

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>,
)
