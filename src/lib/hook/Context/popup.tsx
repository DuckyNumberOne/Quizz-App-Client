import React, { ReactNode, createContext, useState } from 'react';

interface PopupProps {
    children?: ReactNode;
}
interface PopupContextType {
    popup: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupContext = createContext<PopupContextType>({
    popup: false,
    setPopup: () => {},
});

const Popup = ({ children }: PopupProps) => {
    const [popup, setPopup] = useState(false);
    return <PopupContext.Provider value={{ popup, setPopup }}>{children}</PopupContext.Provider>;
};
export default Popup;
