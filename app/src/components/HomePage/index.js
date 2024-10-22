import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'
const Home=()=>{
    return(
        <div className='home'>
        <Header/>
        <div className="home-container">
        <Sidebar/>
        <div className="home-main-container">
            <h1>Home</h1>
            
        </div>
        </div>
        </div>
    )
}
export default Home