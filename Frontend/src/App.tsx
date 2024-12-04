
import Router from './nav/router'
import './util/firebase'

function App() {

  return (
    <div className="h-screen w-screen bg-blue-50 flex flex-col">
      <Router />
    </div>
  )
}

export default App