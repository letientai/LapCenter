import { BrowserRouter, Switch, Route } from "react-router-dom";
import Contact from "../pages/contact/contact";
import Home from "../pages/home/home";
import Introduct from "../pages/introduct/introduct";
import Login from "../pages/login/login";
import NotFoundPage from "../pages/notFound/notFound";
import Register from "../pages/register/register";
import ProductDetail from "../pages/productDetail/productDetail";


function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/introduct" component={Introduct} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/product/:id" component={ProductDetail} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}
export default Router;