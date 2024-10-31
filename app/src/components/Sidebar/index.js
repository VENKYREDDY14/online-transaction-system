import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import Context from "../../Context/Context";
import {Link} from 'react-router-dom'
import './index.css'
const listItems=[{
    icon:<IoHomeOutline/>,
    id:"HOME",
    displayText:"Home",
    path:"/home"
},
{   icon:<CgProfile/>,
    id:"PROFILE",
 displayText:'Profile' ,
 path:'/profile'  
},{
    icon:<GrTransaction/>,
    id:"HISTORY",
    displayText:"History",
    path:"/history"
},
{icon:<MdAccountBalanceWallet/>,
    id:"BALANCE",
 displayText:"Balance",
 path:'/balance'
},]
const Sidebar=()=>{
    return(
    <Context.Consumer>
        {value=>{
            const {activeTabId,changeActiveTabId}=value;
            return(
                <>
                <div className="sidebar-container d-none d-sm-block">
                    <ul type="none" className="sidebar-ul-list d-flex flex-column justify-content-evenly">
                        {listItems.map((eachListItem)=>(
                            <Link to={eachListItem.path} className="link-item" key={eachListItem.id}>
                            <li key={eachListItem.id} className={`sidebar-list-item ${activeTabId===eachListItem.id?'active-tab-color':''}`}>
                                <button className={`sidebr-listitem-button d-flex align-items-center ${activeTabId===eachListItem.id?'active-listitem-button-color':''}`} onClick={()=>{changeActiveTabId(eachListItem.id)}}>
                                <span className="styling-sidebar-icon">{eachListItem.icon}</span>
                                <p className="styling-sidebar-display-text d-sm-none d-md-block">{eachListItem.displayText}</p>
                                </button>
                            </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="d-sm-none footer-mobile">
                <ul type="none" className="d-flex footer-ul-mobile">
                        {listItems.map((eachListItem)=>(
                             <Link to={eachListItem.path} className="link-item" key={eachListItem.id}>
                            <li key={eachListItem.id} className={`${activeTabId===eachListItem.id?'active-tab-color':''}`}>
                                <button className={`sidebr-listitem-button ${activeTabId===eachListItem.id?'active-listitem-button-color':''}`} onClick={()=>{changeActiveTabId(eachListItem.id)}}>
                                <span className="styling-sidebar-icon">{eachListItem.icon}</span>
                                </button>
                            </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                </>
            )
        }}
    </Context.Consumer>
    )
}
export default Sidebar