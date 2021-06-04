import React from "react";
import Card from "react-credit-cards";
import s from './product.module.css'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";
import SupportedCards from "./CreditCards";
import { db } from "../../firebase/init";
import { ProgressBar } from "@blueprintjs/core";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    loading:false,
    msg:""
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  redirectTo = (url) =>{
    window.location.href = url;
  }

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

      this.setState({loading:true, msg:'Processing....'});
      let d = new Date();
      if(this.props.isArr){
        this.props.product.map((p,i)=>{
          db.ref(`users/${this.props.user.uid}/orders/${p.productId}`).set(p).then(res=>{
            db.ref(`products/${p.productId}/orders/${this.props.user.uid}`).set({
              customerEmail:this.props.user.email,
              customerId:this.props.user.uid,
              date:`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            }).then(r=>{
              if(i===this.props.product.length - 1){
                setTimeout(()=>{
                  this.setState({ msg:'Success!'});
                },500);
                setTimeout(()=>{
                  this.setState({loading:false, msg:''});
                  this.props.closeOpen();
                  this.redirectTo('/my-orders');
                },1200)
              }
            });
          });
        })
      }
      else{
        db.ref(`users/${this.props.user.uid}/orders/${this.props.product.id}`).set(this.props.product).then((res)=>{
          db.ref(`products/${this.props.product.id}/orders/${this.props.user.uid}`).set({
            customerEmail:this.props.user.email,
            customerId:this.props.user.uid,
            date:`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
          }).then(r=>{
            setTimeout(()=>{
              this.setState({ msg:'Success!'});
            },500);
            setTimeout(()=>{
              this.setState({loading:false, msg:''});
              this.props.closeOpen();
              this.redirectTo('/my-orders');
            },1200)
          })
        })
      }


    this.setState({ formData });
    // this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData, loading, msg } = this.state;

    return (
      <>
        {
            loading?
            <div className={s.product_upload_progress}>
                <div className={s.inner}>
                    <h4 style={{color:msg=="Success!"?'green':'#333'}}>{msg}</h4>
                    <ProgressBar value={msg==="Success!"?1:0.65} intent="primary"/>
                </div>
            </div>
            :null
        }
      <div key="Payment">
        <div className="App-payment">
          <h1>Credit Card information</h1>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} className="flex-column-center" style={{marginTop:25}}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control bp3-input"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <br/>
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control bp3-input"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control bp3-input"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control bp3-input"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block bp3-button" style={{marginTop:25, backgroundColor:'orange', backgroundImage:'none', width:'300px', color:'#fff'}}>PAY</button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "30px 0" }} />
          <SupportedCards />
        </div>
      </div>
      </>
    );
  }
}
