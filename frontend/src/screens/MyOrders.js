import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { o } from "../Utils/translateLibrary/order";
const MyOrders = ({ history }) => {
  const settings = useSelector((state) => state.settings);
  const { language } = settings;
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading, orders, error } = orderListMy
  useEffect(() => {
    !userInfo && history.push('/')
    dispatch(listMyOrders())
  }, [userInfo, history])
  return (
    <div className='myOrders-outermost'>
      {loading ? (
        <Loading />
      ) : (
        <div className='myOrders-inner'>
          <span className='my-text'>{o.myorders[language]}</span>
          {orders && orders.length < 1 && (
            <Message
              message='You have not made any orders till now'
              color='black'
            />
          )}
          {orders &&
            orders.map((order) => (
              <div key={order._id} className='orderset'>
                <div className='orderManage'>
                  <span>{o.orderid[language]} = {order._id}</span>
                  <span style={{ padding: 0 }}>
                    {o.orderdate[language]} = {order.createdAt.substring(0, 10)}
                  </span>
                  <span>
                    {o.paidstatus[language]} ={' '}
                    {order.isPaid ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i class='far fa-times-circle'></i>
                    )}
                  </span>
                  <span>
                    {o.deliverystatus[language]} ={' '}
                    {!order.isDelivered ? (
                      <i class='far fa-times-circle'></i>
                    ) : (
                      <i className='fas fa-check'></i>
                    )}
                  </span>
                </div>
                <div className='ordered-Items'>
                  <span className='my-text-1'>{o.itemsordered[language]}</span>
                  {order.orderItems &&
                    order.orderItems.map((order) => (
                      <>
                        <div
                          style={{ width: '500px' }}
                          className='cart-controller'
                          key={order.product}
                        >
                          <img src={order.image} alt='' />

                          <span>{order.name}</span>
                          <span>
                            {order.qty}x{order.price} = Rs.{' '}
                            {order.price * order.qty}
                          </span>
                        </div>
                        <div
                          style={{ marginLeft: '10px', width: '100%' }}
                          className='underline'
                        ></div>
                      </>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
