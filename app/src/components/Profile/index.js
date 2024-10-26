import Header from '../Header';
import Sidebar from '../Sidebar';
import Context from '../../Context/Context';
import { useContext, useEffect, useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import {Link} from 'react-router-dom';
import './index.css';

const Profile = () => {
  const { changeActiveTabId } = useContext(Context);
  
  const [photoUrl, setPhotoUrl] = useState('');

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

  useEffect(() => {
    changeActiveTabId('PROFILE');
  }, [changeActiveTabId]);

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
                backgroundImage: photoUrl ? `url(${photoUrl})` : 'url(https://res.cloudinary.com/dsad92ak9/image/upload/mpmecbcu0xjcp4zdrrfi.jpg)', // Use uploaded photo or default
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
            <p><strong>username:</strong>profile name</p>
            <p><strong>gmail:</strong>profile@gmail.com</p>
            <p><strong>number:</strong>0123456789</p>
          </div>
        </div>
        
        <div className="account-details">
        <h2  className='profile-details-heading'>Account Details:</h2>
        <p><strong>Account Number:</strong> accountNumber</p>
        <p><strong>Account Type:</strong> accountType</p>
        <p><strong>Balance:</strong> balance</p>
      </div>
      <div className='account-details'>
        <h2  className='profile-details-heading'>More Options:</h2>
        <Link to="/new-password">
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
