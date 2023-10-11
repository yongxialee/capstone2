import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";

import CurrentUserContext from "./context/CurrentUserContext";

const PrivateRoute = ({exact, path, children}) => {
    const { currentUser } = useContext(CurrentUserContext);
    // const navigate=useNavigate()
    const history=useHistory()
    
    if (!currentUser) {
        alert('log in required!')
        return history.push("/login")
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;