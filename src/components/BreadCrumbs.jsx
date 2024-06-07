import { Link, useLocation } from "react-router-dom"




const BreadCrumbs = () => {

    const location = useLocation()
    let currentLink = ""
    const crumbs = location.pathname.split("/")
    .filter(crumb=>crumb !== "")
    .map(crumb => {
        currentLink += `/${crumb}`
        return (
            <div className="crumb" key={crumb} >
                <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })
    // console.log(location)
    return (
        <div className="breadcrumbs">
            <h1>{crumbs}</h1>
        </div>
    )
}

export default BreadCrumbs