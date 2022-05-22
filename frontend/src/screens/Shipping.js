import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { sh } from "../Utils/translateLibrary/shipping";
const Shipping = ({ history }) => {
const settings = useSelector((state) => state.settings);
  const { language } = settings;
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [phoneNumber, setphoneNumber] = useState(shippingAddress.phoneNumber)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        phoneNumber,
      })
    )
    history.push('/payment')
  }
  useEffect(() => {
    !userInfo && history.push('/')
  }, [userInfo])
  return (
    <div className='shipping-outer'>
      <CheckoutSteps step1 step2 />
      <div className='form-outer'>
        <div className='form-outermost'>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={sh.eyd[language]}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={sh.eyc[language]}
                required
              />
            </div>

            <div className='form-control'>
              <input
                type='Tole'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder={sh.tn[language]}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                placeholder={sh.contact[language]}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={sh.lk[language]}
                required
              />
            </div>

            <button type='submit'>{sh.continue[language]}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping
