import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../shared/utils/success.png";
import styles from "./EmailVerify.module.css";

const EmailUpdateVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  console.log(`PARAMS ID    ${param.id}
    PARAMS TOKEN     ${param.token}`);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/userlist/${param.id}/verifyupdateemail/${param.token}/`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error.data.message);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Updated Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.black_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailUpdateVerify;
