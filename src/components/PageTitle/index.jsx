import { useEffect } from "react";

//Serve para alterar o título da página sempre que alguma alteração ocorrer
function PageTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <></>; 
}


export default PageTitle;