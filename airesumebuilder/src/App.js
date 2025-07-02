import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from "./components/HomePage.js"; 
import LoginPage from './components/Login.js';
import RegisterPage from './components/Register.js';
import ResumeBuilder from './components/ResumeBuilder.js';
import ViewResume from './components/ViewResume.js';
import Home from './components/Home.js';
 
 
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute.js';
import SavedResume from './components/SaveResume.js';
import TemplatePreview from "./components/TemplatePreview";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PublicResume from './components/PublicResume.js';
import VerifyEmail from  './components/VerifyEmail.js';
import GoogleSignIn from './components/GoogleSignIn.js';
import Dashboard from './components/Dashboard.js';
 import TemplateEditor from "./components/ResumeEditor.js";
 
 
import SaveResume from './components/SaveResume.js';
 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomEditor from './components/CustomEditor.js';
import Features from './components/footer/feature.js';
import CareerAdvice from './components/footer/CareerAdvice.js';
import ResumeTips from './components/footer/ResumeTips.js';
import About from './components/footer/About.js';
import Contact from './components/footer/Contact.js';
import AccountSettings from './components/AccountSettings.js';
import FAQ from './components/FAQ.js';
 
 
function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const token = sessionStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

  return <>
  <DndProvider backend={HTML5Backend}> 
   
  <Routes>
      
  <Route path="/" element={<Home />}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/register" element={<RegisterPage/>}/>
   <Route path="/home" element={<Home/>}/>

   <Route path="/buildresume" element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} />
   <Route path="/viewresume" element={<PrivateRoute><ViewResume/></PrivateRoute> } />
   <Route path="/savedresume/:id" element={<PrivateRoute><SavedResume/></PrivateRoute> }/>
     <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute> } />
   <Route path="/viewresume/:id" element={<PrivateRoute><ViewResume /></PrivateRoute> } />
<Route path="/saveresume" element={<PrivateRoute><SaveResume/></PrivateRoute> } />
    <Route path="/custom-editor" element={<PrivateRoute><CustomEditor /></PrivateRoute> } />
 <Route path="/editresume/:id" element={<PrivateRoute><CustomEditor isEditMode={true} /></PrivateRoute> } />
 <Route path="/edit-template/:id" element={<PrivateRoute><TemplateEditor /></PrivateRoute> } />
<Route path="/select-template" element={<PrivateRoute><TemplatePreview /></PrivateRoute> } />
    <Route path="/verify/:token" element={ <VerifyEmail/>  } />
    <Route path="/google-signin" element={ <GoogleSignIn/>} />

   <Route path="/resume/public/:id" element={<PublicResume />} />
    <Route path='/features' element={<Features/>} />
     <Route path="/career-advice" element={<CareerAdvice />} />
        <Route path="/resume-tips" element={<ResumeTips/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/faq" element={<FAQ />} />
  </Routes>
  </DndProvider>
  </>
     
}
 

export default App;
