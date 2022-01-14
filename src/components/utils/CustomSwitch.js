import { useEffect } from "react";
import { Switch, useHistory } from "react-router";

const NotFoundPage = ({CustomNotFoundPage}) => {
    const history = useHistory();
    useEffect(() => {
        history.push("/pageNotFound");
    }, [history]);
    return null;
}

const CustomSwitch = ({children}) => {
    return (
        <Switch>
            {children}
            <NotFoundPage />
        </Switch>
    )
}

export default CustomSwitch
