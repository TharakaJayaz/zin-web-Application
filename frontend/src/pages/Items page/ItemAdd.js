import React, { useState, useEffect, useRef } from "react";
import classes from "./ItemAdd.module.css";
import logo from "../../assets/ZR.png";
import { useNavigate } from 'react-router-dom';
import backgroundDesign from "../../assets/Background vector group.png";
import background from '../../assets/Background vector group.png';
//import ItemAddSuccess from "./ItemAddSuccess";
import axios from "axios";

import PopupMessage from './popupMessage'; // Import the component responsible for displaying the popup message
//import classes from "./popupMessage.module.css";
//import { shouldProcessLinkClick } from "react-router-dom/dist/dom";

const ItemAdd = () => {
  const stockIDInputRef = useRef();
  const qtyInputRef = useRef();
  const productnameInputRef = useRef();
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const manufacturedateInputRef = useRef();
  const expirydateInputRef = useRef();
  const dInputRef = useRef();
  const imageInputRef = useRef();




  //validation logic values

  const [validationLogic, setValidationLogic] = useState();
  // const [passwordValidLogic, setPasswordValidLogic] = useState();
  // const [passwordError, setpasswordError] = useState();
  const [Showmessage, setShowmessage] = useState(false);
  const [nicValidLogic, setNicValidLogic] = useState();
  const [buttonLogic, setButtonLogic] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [itemData, setItemData] = useState({});


  const navigation = useNavigate();
  const handleAddButtonClick = () => {
    setShowPopup(true);
  };
  const handleClick = async (e, inputData) => {
    console.log("call handle click")
    console.log(itemData)

    try {
      const response = await axios.post("http://localhost:8800/stock", itemData)

      if (response.data == 'successfull') {
        setShowPopup(true);
      }

    } catch (err) {
      console.log(err);
    }

  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("submitted");
    //debugger;
    const inputValues = {
      stockID: stockIDInputRef.current.value,
      qty: qtyInputRef.current.value,
      productname: productnameInputRef.current.value,
      name: nameInputRef.current.value,
      price: priceInputRef.current.value,
      manufacturedate: manufacturedateInputRef.current.value,
      expirydate: expirydateInputRef.current.value,
      discount: dInputRef.current.value,
      image: imageInputRef.current.files.length !== 0 ? imageInputRef.current.files[0].name : null
    }




    console.log(inputValues.stockID, inputValues.qty, inputValues.name, inputValues.price, inputValues.manufacturedate, inputValues.expirydate, inputValues.discount, inputValues.image);
    if (inputValues.stockID.trim() === '' || inputValues.qty.trim() === '' || inputValues.name.trim() === '' || inputValues.manufacturedate.trim() === '' || inputValues.expirydate.trim() === '' || inputValues.discount.trim() === '') {
      setValidationLogic(true);
      console.log('setting true')
      return;

    } else {
      setValidationLogic(false)
    }
    const res = await setItemData(inputValues);
    // debugger;

  };
  useEffect(() => {
    if (Object.keys(itemData).length > 0) {
      handleClick(itemData);
    }
  }, [itemData]);
  const x = { name: "akile", age: 23 }

  const imgOnclickHandler = () => {
    navigation('/admin/items/update');
  }
  return (
    <div className={classes.main_div} style={{ position: "relative" }}>
      <div style={{ position: "absolute", zIndex: 200 }}>
        {/* {showPopup && <PopupMessage onClose={() => setShowPopup(false)} data={x}/>} */}
        {showPopup && <PopupMessage onClose={() => setShowPopup(false)} />}

      </div>



      {!buttonLogic && (<div className={classes.secondry_div}>
        <img className={classes.zr_logo} onClick={imgOnclickHandler} src={logo} alt="zr red logo" />
        <form onSubmit={formSubmitHandler} className={classes.form_main}>
          <h2 className={classes.form_heading}>
            Add Items
          </h2>

          <table className={classes.form_table}>
            <tbody>
              <tr className={classes.form_tr1}>
                <td>
                  StockID <br></br>
                  <input ref={stockIDInputRef} type="text" className={classes.form_inputs} />
                </td>

                <td>Quantity
                  <br></br>
                  <input ref={qtyInputRef} min ={0} type="number" className={classes.form_inputs} />
                </td>

                <td>
                  Product Name<br></br>
                  <input ref={productnameInputRef} type="text" className={classes.form_inputs} />
                </td>
              </tr>


              <tr className={classes.form_tr2}>
                <td>Name
                  <br></br>
                  <input ref={nameInputRef} type="text" className={classes.form_inputs} />
                </td>
                <td>
                  Price <br></br>
                  <input ref={priceInputRef} min={0} type="number" className={classes.form_inputs} />
                </td>

                <td>
                  Manufacture Date<br></br>
                  <input ref={manufacturedateInputRef} type="date" className={classes.form_inputs} />
                </td>
              </tr>
              <tr className={classes.form_tr3}>
                <td>
                  Expiry Date <br></br>
                  <input ref={expirydateInputRef} type="date" className={`${classes.form_inputs} ${nicValidLogic && (classes.err_style)}`} />
                </td>
                <td>
                  Discount <br></br>
                  <input ref={dInputRef} min ={0} type="number" className={classes.form_inputs} />
                </td>

                <td>
                  Image <br></br>
                  <input ref={imageInputRef} type="file" className={classes.form_inputs} name="image" style={{ padding: '4px' }} />
                </td>

              </tr>
            </tbody>
          </table>
          {validationLogic && <p className={classes.err_para}>All inputs should  be filled*</p>}
          <div className={classes.form_button_div}>
            <button className={classes.form_cancel} >
              {" "}
              Cancel
            </button>
            <button type="submit" className={classes.form_continue} onClick={formSubmitHandler} >Add</button>

          </div>
        </form>
      </div>)}


      {buttonLogic && (<PopupMessage style={classes.erro_message} />)}
      {/* {showPopup && <PopupMessage center onClose={() => setShowPopup(false)} />} */}
      <img
        className={classes.img_back}
        src={backgroundDesign}
        alt="background vector"
      />
    </div>
  );
};

export default ItemAdd;