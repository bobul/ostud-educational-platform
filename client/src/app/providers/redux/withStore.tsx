import {Provider} from "react-redux";
import {setupStore} from "../../store";

const store = setupStore()

export const withStore = (Component: React.ComponentType<any>) => (props: any) => {

    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}
