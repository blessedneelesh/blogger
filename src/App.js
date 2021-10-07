import logo from "./logo.svg";
import "./App.css";
import { Footer, NavBar } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Blogs, BlogsWithComments, Home, PostBlogs, UserLogin, UserRegister } from "./pages";
import PrivateRoutes from "./routes/privateRoutes";
import Routes from "./routes/routes";


function App() {

  const pagesRoute=()=>{
    return(
      <div>
        <NavBar/>
        <Routes />
        hello
        <Footer/>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/user-login" component={UserLogin} />
        <Route exact path="/user-register" component={UserRegister} />
        <PrivateRoutes exact path="/" component={Home} />
        <PrivateRoutes exact path='/blogs' component={Blogs}/>
        <PrivateRoutes exact path='/post-blogs' component={PostBlogs}/>
        <PrivateRoutes exact path='/blogs/:postId' component={BlogsWithComments}/>
        {/* <PrivateRoutes component={pagesRoute}/> */}
      </Switch>
    </Router>

    //     <div className="App">
    // <NavBar/>

    // <Footer/>
    //     </div>
  );
}

export default App;
