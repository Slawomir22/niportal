import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RequestRegister } from "../models/requestRegister";
import { User } from "src/app/shared/models/user";
import { BackEndErrors } from "../../shared/models/backEndErrors";
import { RequestLogin } from "../models/requestLogin";
import { RequestUser } from "src/app/shared/models/requestUser";

export const authUserActions = createActionGroup({
  source: "auth",
  events: {
    register_user: props<{ request: RequestRegister }>(),
    register_user_success: props<{ user: User }>(),
    register_user_failure: props<{ errors: BackEndErrors }>(),

    login_user: props<{ request: RequestLogin }>(),
    login_user_success: props<{ user: User }>(),
    login_user_failure: props<{ errors: BackEndErrors }>(),

    get_user: emptyProps(),
    get_user_success: props<{ user: User }>(),
    get_user_failure: emptyProps(),

    update_user: props<{ user: RequestUser }>(),
    update_user_success: props<{ user: User }>(),
    update_user_failure: props<{ errors: BackEndErrors }>(),

    logout: emptyProps(),
  },
});

// export const registerUser = createAction('[Auth] register', props<{ request: RequestRegister }>())

// export const registerUserSuccess = createAction('[Auth] register success', props<{ user: User }>())

// export const registerUserFailure = createAction('[Auth] register failure', emptyProps())
