import Topbar from './components/topbar/Topbar';
import BottomBar from './components/BottomBar';
import Main from './nav/Main';
import { motion } from "framer-motion"
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from './StateManagment/Auth';
import { MenuProvider } from './StateManagment/MobileMenu';
import { SavedProvider } from './StateManagment/SavedIcon';
import Footer from './components/Footer';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const api_regex = /^\/api\/.*/

    if (api_regex.test(window.location.pathname)) {
        console.log('api')
        return <div /> // must return at least an empty div
     } else {
        return (
          <motion.div 
          className="App"
          initial="hidden"
          animate="visible"
          variants={variants}
          >
            <Router>
              <AuthProvider>
                <MenuProvider>
                  <SavedProvider>
                  <DndProvider backend={HTML5Backend}>
                    <>
                      <Topbar />
                      <Main/>
                      <BottomBar/>
                      <Footer/>
                    </>
                  </DndProvider>
                  </SavedProvider>
                </MenuProvider>
              </AuthProvider>
            </Router>
          </motion.div>
        );
     }
}

export default App;