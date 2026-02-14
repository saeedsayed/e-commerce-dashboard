import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

interface IProps{
    children: ReactNode
}

const NextIntlProvider = ({children}:IProps)=>{

    return <NextIntlClientProvider
    //  messages={messages}
     >{children}</NextIntlClientProvider>
}

export default NextIntlProvider