import { Alert } from "react-bootstrap";

const Notify = ({ variant = "danger", msg }) => {
  return (
    <>
      <Alert variant={variant} style={{ textAlign: "center" }}>
        {msg}
      </Alert>
    </>
  );
};

export default Notify;
