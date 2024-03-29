import React, { useEffect, useState } from "react";
import classes from "./RepCard2.module.css";
import user from "../../../assets/userImage.png";
import axios from "axios";

const RepCard = (props) => {
  const [errStatus, setErrStatus] = useState(false);
  const [errStatusConfirm, setErrStatusConfirm] = useState(false);
  const [confirmAccept,setConfirmAccept] = useState(false);

  // const [confirm, SetConfirm] = useState(false);
  const [datas, setData] = useState({
    date: " ",
    password: " ",
    email: " ",
    RID: " ",
    full_name: " ",
    phone: " ",
    NIC: " ",
    address: " ",
  });

  // useEffect(() => {
  //   setData({
  //     date: props.rdate,
  //     password: props.password,
  //     email: props.email,
  //     RID: props.rid,
  //     full_name: props.name,
  //     phone: props.mobile,
  //     NIC: props.nic,
  //     address: props.address,
  //   });
  // }, []);

  // const[dataLogic,setDataLogic] = useState('false');
  const handleDelete = async (id) => {
    setErrStatus(true);
    // console.log("errr status", errStatus);
    // async function to make API request
    // console.log("confirmation", confirm);
    // if (confirm) {
    //   try {
    //     await axios.delete("http://localhost:8800/reps/" + props.rid);
    //     SetConfirm(false);
    //     window.location.reload();
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   setErrStatus(false);
      
    // }
  };

  const handleAccept = async () => {
    setErrStatus(true);
    setErrStatusConfirm(true);
  };

  const noButtonHandler = () => {
    // SetConfirm(false);
    setErrStatus(false);
  };

  const yesButtonHandler = async () => {
    // console.log("clicked yes");
    // SetConfirm(true);
    // console.log(confirm);
    if(errStatusConfirm){
      setConfirmAccept(true);
      try {
        // await axios.post("http://localhost:8800/reps", datas);
  
        await axios.post("http://localhost:8800/reps", {
          date: props.date,
          password: props.password,
          email: props.email,
          RID: props.rid,
          full_name: props.name,
          phone: props.mobile,
          NIC: props.nic,
          address: props.address,
          type: props.type, // have to change to sex:
        });
        // setErrStatus(true);
        // window.location.reload();
  
        console.log("add to sales rep table");
      } catch (err) {
        console.log(err);
      }


      try {
        await axios.delete("http://localhost:8800/reps/" + props.rid);
        
       
      } catch (err) {
        console.log(err);
      }


    }else{
      try {
        await axios.delete("http://localhost:8800/reps/" + props.rid);
        
       
      } catch (err) {
        console.log(err);
      }

    }
    console.log("value of confirm accept",confirmAccept);

    // handleDelete(props.rid);
    setErrStatus(false);
    window.location.reload();
    
  };
  return (
    <div className={classes.repCard_main_div}>
      <div className={classes.repCard_second_div}>
        {!errStatus && (
          <>
            <img src={user} alt="user" className={classes.repCard_image} />
            <table className={classes.repCard_table}>
              <tbody>
                <tr className={classes.table_tr}>
                  <td>
                    Full name
                    <br></br>
                    <p>{props.name}</p>
                  </td>

                  <td>
                    Mobile
                    <br></br>
                    <p>{props.mobile}</p>
                  </td>
                </tr>

                <tr className={classes.table_tr}>
                  <td>
                    NIC
                    <br></br>
                    <p>{props.nic}</p>
                  </td>

                  <td>
                    Register date
                    <br></br>
                    <p>{props.date}</p>
                  </td>
                </tr>

                <tr className={classes.table_tr}>
                  <td>
                    DOB
                    <br></br>
                    <p>1999-09-20</p>
                  </td>

                  <td>
                    Sex
                    <br></br>
                    <p>{props.type}</p>
                  </td>
                </tr>

                <tr className={classes.table_tr}>
                  <td>
                    Email
                    <br></br>
                    <p>{props.email}</p>
                  </td>

                  <td>
                    Address
                    <br></br>
                    <p>{props.address}</p>
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <button
                      className={classes.repCard_Button_accepts}
                      onClick={() => handleAccept(props.rid)}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      className={classes.repCard_Button_cancel}
                      onClick={() => handleDelete(props.rid)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
            {/* testing  */}
            <div className={classes.btn_div}>
              <button
                className={classes.repCard_Button_accepts}
                onClick={() => handleAccept(props.rid)}
              >
                Accept
              </button>
              <button
                className={classes.repCard_Button_cancel}
                onClick={() => handleDelete(props.rid)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {errStatus && (
          <div className={classes.err_msg}>
           { !errStatusConfirm && ( <p>Do you want to delete ? </p> ) }
           { errStatusConfirm &&( <p>Do you want to confirm this data ? </p> ) }
            <button onClick={yesButtonHandler} className={classes.btny}>
              {" "}
              Yes
            </button>
            <button onClick={noButtonHandler} className={classes.btnN}>
              {" "}
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepCard;
