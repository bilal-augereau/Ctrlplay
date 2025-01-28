import type { Dispatch, SetStateAction } from "react";
import type { User } from "./user.type";

export interface AppContextInterface {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}
