import {Outlet} from "react-router-dom";
import  './WelcomeLayout.css'
import WelcomeNavigation from "../WelcomeNavigation/WelcomeNavigation.jsx";

const WelcomeLayout = () => {
    return (
        <main className='page page-live'>
           <div className='welcome'>
               <div className='container'>
                   <div className='layout'>
                       <div className='layout__content'>
                           <Outlet/>
                       </div>
                       <div className='layout__sidebar'>
                           <WelcomeNavigation/>
                       </div>
                   </div>
               </div>
           </div>
        </main>
    );
};

export default WelcomeLayout;