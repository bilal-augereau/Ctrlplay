import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type UserType = {
	id: number;
	pseudo: string;
	password: string;
	avatar: string;
};

type UserContextType = {
	user: UserType | null;
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useAuth must be used within a UserProvider");
	}
	return context;
};
