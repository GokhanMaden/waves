import React from 'react';
import UserLayout from '../../hoc/user';
import Button from '../Utils/Button';

const UserDashboard = ({user}) => {

  if(user && user.userData) {
    var userName = user.userData.name;
    var userLastname = user.userData.lastname;
    var userEmail = user.userData.email;
  }
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>Name: {userName}</span>
            <span>Lastname: {userLastname}</span>
            <span>Email: {userEmail}</span>
          </div>
          <Button 
            type="default"
            title="Edit Accunt"
            linkTo="/user/user_profile"
          />
        </div>
        <div className="user_nfo_panel">
          <h1>
            History Purchase
          </h1>
          <div className="user_product_block_wrapper">
            History
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserDashboard;
