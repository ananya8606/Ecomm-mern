import React, { Suspense } from 'react';
import ReactDOM from 'react-dom'
// Translation Config
import './translateConfig'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Provider store={store}>
  <Suspense fallback="...loading">
            <App />
        </Suspense>
  </Provider>,
  document.getElementById('root')
)
