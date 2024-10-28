import React,{useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../Form/Signup";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { Modal, Button } from 'antd';
import userImg from '../../assets/user.svg'

function Header() {
  const [user] = useAuthState(auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  function logout() {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");  // Navigate after successful logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
        toast.error("failed, Please retry");
      });
  }
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 
  return (
    <>
      <div className="navbar">
          <Link to={"/"}>
            <div className="logo" >
              <img src="/vite.svg" alt="logo" height={24} />
              <span className=" navlogo ">FinTracker</span>
            </div>
          </Link>
          {user ? (
           <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
        <img  src={user.photoURL ? user.photoURL : userImg} alt="User" style={{ borderRadius: '50%', height: '38px', width:'38px', backgroundColor :'#75a6ff' , padding: !user.photoURL ? '8px' : '0', 
        }} 
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop
          e.target.src = userImg // Fallback to local asset on error
        }}
        
       />
           
             <Button onClick={logout} type="primary" shape="round">
              Logout
            </Button> </div>
          ) : (
            <>
              <div>
              <Button type="primary" shape="round" onClick={showModal}>
        GetStarted
      </Button></div>
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <img src="/vite.svg" alt="logo" height={30} />
            <h2 className="title">
              Welcome to{' '}
              <span style={{ color: 'var(--lighttheme)' }}>FinTracker.</span>
            </h2>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default footer
        centered // Center the modal
      >
        <div className="modal-body auth-body">
          <Signup />
        </div>
      </Modal>
            </>
          )}
        
      </div>
    </>
  );
}

export default Header;
