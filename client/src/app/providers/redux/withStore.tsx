import {Provider} from "react-redux";
import {setupStore} from "../../store";
import {useAppDispatch} from "../../../shared/hooks/redux";
import {useEffect} from "react";
import {userCheckAuth} from "../../../entities/user/store/reducers/actionCreators.ts";

const store = setupStore()

export const withStore = (Component: React.ComponentType<any>) => (props: any) => {

    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}
