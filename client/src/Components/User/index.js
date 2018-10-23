import React from 'react';
import UserLayout from '../../hoc/user';
import Button from '../Utils/Button';

const UserDashboard = () => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>Name</span>
            <span>Lastname</span>
            <span>Email</span>
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
