import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { pay } from "../Utils/translateLibrary/paymentMethod";
const Payment = ({ history }) => {
const settings = useSelector((state) => state.settings);
  const { language } = settings;
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('Pay On Delivery')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  if (!shippingAddress.address) {
    history.push('/shipping')
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  useEffect(() => {
    !userInfo && history.push('/')
  }, [userInfo])
  return (
    <div className='payment-outer'>
      <CheckoutSteps step1 step2 step3 />
      <div className='form-control-payment'>
        <span style={{ textAlign: 'center' }}>{pay.pa[language]}</span>
        <div className='pay'>
          <span>{pay.can[language]}</span>
        </div>
        <button onClick={submitHandler} className='payButton'>
          {pay.continue[language]}
        </button>
      </div>
    </div>
  )
}

export default Payment
