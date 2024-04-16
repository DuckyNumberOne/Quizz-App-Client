import { UserContextType } from '@/lib/domain/user';
import React, { ReactNode, createContext, useState } from 'react';

interface UserProps {
    children?: ReactNode;
}

export const UserContext = createContext<UserContextType>({
    dataUser: { address: '', birday: '', email: '', idUser: '', name: '', password: '', phonenumber: '', role: '' },
    setDataUser: () => {},
});

const CreateUser = ({ children }: UserProps) => {
    const [dataUser, setDataUser] = useState({ address: '', birday: '', email: '', idUser: '', name: '', password: '', phonenumber: '', role: '' });
    return <UserContext.Provider value={{ dataUser, setDataUser }}>{children}</UserContext.Provider>;
};
export default CreateUser;
