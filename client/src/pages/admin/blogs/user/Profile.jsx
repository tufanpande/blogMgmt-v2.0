import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Profile = () => {
  return (
    <div className="container">
      <Tabs defaultActiveKey="profile" className="mb-3">
        <Tab eventKey="home" title="Home">
          Profile Detail
        </Tab>
        <Tab eventKey="profile" title="Change Password">
          You can change your password
        </Tab>
        <Tab eventKey="contact" title="Social Accounts">
          Tab content for Contact
        </Tab>
        <Tab eventKey="reset-password" title="Reset Password">
          Tab content for Reset Password
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
