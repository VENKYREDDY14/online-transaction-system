import Header from '../Header';
import Sidebar from '../Sidebar';
import Context from '../../Context/Context';
import { useContext, useEffect, useState,useCallback} from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Profile = () => {
  const { changeActiveTabId } = useContext(Context);
  const [photoUrl, setPhotoUrl] = useState('');
  const [profileDetails,setProfileDetails]=useState('');
  const onChangeProfileLogo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
       
      };
      reader.readAsDataURL(file);
    }
  };
  const getProfile=useCallback(async()=>{
    const id=Cookies.get('id');
    const response=await fetch(`http://localhost:3001/profile/${id}`);
    if(response.ok){
      const details=await response.json();
      console.log(details);
      setProfileDetails(details);
    }
  },[])
  useEffect(() => {
    changeActiveTabId('PROFILE');
    getProfile();
  }, [changeActiveTabId,getProfile]);


  return (
    <div className='profile'>
      <Header />
      <div className="profile-container">
        <Sidebar />
      
        <div className="profile-main-container">
          <div className='d-flex flex-column flex-sm-row'>
          <button className='styling-profile-button'>
            <div
              className='img-container-profile'
              style={{
                backgroundImage: photoUrl ? `url(${photoUrl})` : 'url(https://res.cloudinary.com/dsad92ak9/image/upload/mpmecbcu0xjcp4zdrrfi.jpg)',
              }}
            >
              <input
                type="file"
                onChange={onChangeProfileLogo}
                style={{ display: 'none' }} 
                id="file-upload"
              />
              <label htmlFor="file-upload" className='custom-file-upload'>
                <span><IoCloudUploadOutline className='icon-profile'/></span>
              </label>
            </div>
          </button>
          <div className='profile-details-container'>
            <h1 className='profile-details-heading'>Personal Information:</h1>
            <p className='personal-details-info'><strong className='personal-details'>Username:</strong> {profileDetails.USERNAME}</p>
            <p className='personal-details-info'><strong className='personal-details'>Email:</strong> {profileDetails.GMAIL}</p>
            <p className='personal-details-info'><strong className='personal-details'>Number:</strong> {profileDetails.PHONE}</p>
          </div>
        </div>
        
        <div className="account-details">
        <h2  className='profile-details-heading'>Account Details:</h2>
        <p className='personal-details-info'><strong className='personal-details'>Id Number:</strong> {profileDetails.ID}</p>
        <p className='personal-details-info'><strong className='personal-details'>Role:</strong> {profileDetails.ROLE===null?'Customer':profileDetails.ROLE}</p>
        <p className='personal-details-info'><strong className='personal-details'>Balance:</strong> <Link to="/balance">check balance</Link></p>
      </div>
      <div className='account-details'>
        <h2  className='profile-details-heading'>More Options:</h2>
        <Link to="/reset-password">
        <button className='btn btn-primary'>change password</button>
        </Link>
        <Link to='/change-number'>
        <button className='change-number-button btn btn-primary'>change number</button>
        </Link>
      </div>
      <div className='account-details'>
        <h2  className='profile-details-heading'>Support Information:</h2>
        <p>For any issues, please contact support at <a href="mailto:support@example.com">support@example.com</a></p>
        <p><a href="/faq">Visit our Help Center</a> for more information.</p>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
