import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import { AuthProvider } from "./utils/helpers/auth";
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Applications from "./Components/Applications/Applications";
import UserChangeData from "./Components/Applications/UserChangeData";
import ApplicationForCar from "./Components/Applications/ApplicationForCar";
import OrderingBusinessCards from "./Components/Applications/OrderingBusinessCards";
import BookingMeetingRooms from "./Components/Applications/BookingMeetingRooms";
import EmployeeSelection from "./Components/Applications/EmployeeSelection";
import ProbationQuestionnaire from "./Components/Applications/ProbationQuestionnaire";
import News from "./Components/News/News";
import SingleNews from "./Components/SingleNews/SingleNews";
import LatestNews from "./Components/LatestNews/LatestNews";
import PassForgot from "./Components/Applications/PassForgot";
import Profile from "./Components/Profile/Profile";
import Documents from "./Components/Documents/Documents";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Company from "./Components/Company/Company";
import CompanyProfile from "./Components/Company/CompanyProfile";
import About from "./Components/About/About";
import RecommendationsPage from "./Components/Recommendations/RecommendationsPage";
import BitrixApp from "./Components/BitrixApp/BitrixApp";
import { UserProvider } from "./Components/UserProvider";
//news
import WelcomeBar from "./Components/WelcomeBar/WelcomeBar.jsx";
import WelcomeLayout from "./Components/WelcomeLayout/WelcomeLayout.jsx";
import WelcomeAbout from "./Components/WelcomeAbout/WelcomeAbout.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <UserProvider>
                    <NavBar />
                </UserProvider>

                <Header />

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="*" element={<NotFound />} />

                        <Route
                            path="profile"
                            element={
                                <UserProvider>
                                    <Profile />
                                </UserProvider>
                            }
                        />

                        <Route path="applications" element={<Applications />} />

                        <Route
                            path="applications/orderingbusinesscards"
                            element={<OrderingBusinessCards />}
                        />

                        <Route
                            path="applications/userchangedata"
                            element={<UserChangeData />}
                        />

                        <Route
                            path="applications/probationquestionnaire"
                            element={<ProbationQuestionnaire />}
                        />

                        <Route
                            path="applications/applicationforcar"
                            element={<ApplicationForCar />}
                        />

                        <Route
                            path="applications/bookingmeetingrooms"
                            element={<BookingMeetingRooms />}
                        />

                        <Route
                            path="applications/passforgot"
                            element={<PassForgot />}
                        />

                        <Route
                            path="applications/employeeselection"
                            element={<EmployeeSelection />}
                        />

                        <Route path="news" element={<News />}>
                            <Route path="news/" element={<LatestNews />} />
                        </Route>

                        <Route path="news/:newsId" element={<SingleNews />} />

                        <Route
                            path="recommendations"
                            element={<RecommendationsPage />}
                        />

                        <Route path="staff" element={<Company />} />

                        <Route
                            path="staff/:profileId"
                            element={<CompanyProfile />}
                        />

                        <Route path="documents" element={<Documents />} />

                        <Route path="about" element={<About />} />

                        <Route path="bitrixapp" element={<BitrixApp />} />

                        <Route path='welcome'>
                            <Route index element={<WelcomeBar/>}/>

                            <Route element={<WelcomeLayout/>}>
                                <Route  path='about' element={<WelcomeAbout/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Routes>

                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
