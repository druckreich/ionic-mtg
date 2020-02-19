import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Navigate} from "@ngxs/router-plugin";

export class RouterService {
    @Dispatch()
    public static navigate(paths: string[]) {
        return new Navigate(paths);
    }
}
