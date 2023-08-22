import {Provider} from "react-redux";
import {setupStore} from "../../store";

const store = setupStore()

export const withStore = (component: () => React.ReactNode) => () =>
    <Provider store={store}>
        {component()}
    </Provider>