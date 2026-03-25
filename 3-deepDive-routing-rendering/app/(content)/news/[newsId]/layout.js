
// here the page.js file is at the same level at the layout.js will be set as a children props here 
export default function NewsDetailLayout({children , modal}){
    return(
        <>
            {modal}
            {children}
        </>
    )
}