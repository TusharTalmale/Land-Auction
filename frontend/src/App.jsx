import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts
import AuctionDetailsContextProvider from "./contexts/AuctionDetailsContext";
import TagContextProvider from "./contexts/TagContext";
import { UserProvider } from "./contexts/UserContext";
import NotificationContextProvider from "./contexts/NotificationContext";
import MessageProvider from "./contexts/MessageContext";
import APIContextProvider from "./contexts/APIContext";

//components
import Navbar from "./components/Navbar";

//pages
import { Home } from "./pages/Home";
import { AuctionDetails } from "./pages/AuctionDetails";
import { Buying } from "./pages/Buying";
import { Selling } from "./pages/Selling";
import { CreateListing } from "./pages/CreateListing";
import { NotFound404 } from "./pages/NotFound404";
import AuctionContextProvider from "./contexts/AuctionContextProvider";
import { Registration } from "./pages/Registration";
import { Conversation } from "./pages/Conversation";
import { MessagesPage } from "./pages/Messages";
import { API } from "./pages/API";
import About from "./pages/About";
import Footer from "./components/Footer";
// import { LandAuctionDetails } from "./pages/LandAuctionDetails";
import { UserProfilePage } from "./pages/Userpage";
import ErrorBoundary from "./contexts/ErrorBoundary";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import IntroPage from "./pages/IntroPage";


function App() {


  return (
    <div className="mt-14">
      <ErrorBoundary>
      <APIContextProvider>
        <UserProvider>
          <NotificationContextProvider>
            <MessageProvider>
              <AuctionContextProvider>
                <AuctionDetailsContextProvider>
                  <TagContextProvider>
                    <Router>
                      <Navbar />
                      <Switch>
                          <Route exact path="/Intro" component={IntroPage} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/auction-details/:id" component={AuctionDetails} />
                        {/* <Route exact path="/land-details/:id" component={LandAuctionDetails} /> */}

                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/Buying" component={Buying} />
                        <Route exact path="/Messages" component={MessagesPage} />
                        <Route exact path="/conversation/:itemId/:userId" component={Conversation} />
                        <Route exact path="/Selling" component={Selling} />
                        <Route exact path="/Create" component={CreateListing} />
                        <Route exact path="/About" component={About} />
                        <Route exact path="/API" component={API} />
                        <Route exact path="/me" component={UserProfilePage} />
                        <ProtectedRouteAdmin exact path="/admin" component={AdminDashboard} />
                        <ProtectedRouteAdmin exact path="/admin/users" component={AdminDashboard} />




                        <Route path="*" component={NotFound404} />
                      </Switch>
                      <Footer/>
                    </Router>
                  </TagContextProvider>
                </AuctionDetailsContextProvider>
              </AuctionContextProvider>
            </MessageProvider>
          </NotificationContextProvider>

        </UserProvider>
      </APIContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
