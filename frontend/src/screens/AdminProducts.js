import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import ClearIcon from '@material-ui/icons/Clear'
import { listProducts } from '../actions/productActions'
import { deleteProduct } from '../actions/productActions'
import { ap } from "../Utils/translateLibrary/adminproducts";
const AdminProducts = ({ history }) => {
const settings = useSelector((state) => state.settings);
const { language, currency } = settings;
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete
  // User Settings
  useEffect(() => {
    !userInfo && history.push('/')
    dispatch(listProducts())
  }, [userInfo, history, loadingDelete])
  const EditHandler = (id) => {
    history.push(`/admin/productEdit/${id}`)
  }
  const DeleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  return (
    <div className='adminOrdersouter'>
      {errorDelete && <Message message={errorDelete} color='black' />}
      {loading || loadingDelete ? (
        <Loading />
      ) : (
        <div className='adminOrder-inner'>
          {products && products.length > 0 ? (
            <table>
              <tr>
                <th>{ap.p[language]}</th>
                <th>{ap.i[language]}</th>

                <th>{ap.n[language]}</th>

                <th>{ap.c[language]}</th>
                <th>{ap.s[language]}</th>
                <th>{ap.b[language]}</th>
                <th>{ap.d[language]}</th>
                <th>{ap.co[language]}</th>
                <th>{ap.pro[language]}</th>

                <th style={{ textAlign: 'center' }}>Edit</th>
                <th>{ap.del[language]}</th>
              </tr>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img
                      style={{ width: '50px', height: '50px' }}
                      src={product.image}
                      alt=''
                    />
                  </td>
                  <td>{product.brandName}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>

                  <td> {product.brand}</td>
                  <td>
                    {' '}
                    {product.discount ? (
                      ` ${product.discount}%`
                    ) : (
                      <ClearIcon
                        style={{
                          color: 'red',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      />
                    )}
                  </td>

                  <td>Rs. {product.discountedCost}</td>

                  <td></td>
                  <td
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    onClick={() => EditHandler(product._id)}
                  >
                    <i className='fas fa-edit'></i>
                  </td>
                  <td
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    onClick={() => DeleteHandler(product._id)}
                  >
                    <i class='fas fa-trash'></i>{' '}
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <Message message={error} color='red' />
          )}
        </div>
      )}
    </div>
  )
}

export default AdminProducts
