import { UserState } from "./user/types";
import { UiState } from "./ui/types";
import { TempState} from './temp/types';
import { AuthState } from "./auth/types";
import { OrganizacaoState } from "./organizacao/types";

export interface ReduxState {
    user: UserState;
    ui: UiState;
    organizacao: OrganizacaoState;
    temp: TempState;
    auth: AuthState;
}