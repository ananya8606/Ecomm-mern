const dotenv = require('dotenv');
const users = require('./data/users.js');
const products = require('./models/User.js');
const Product = require('./models/Product.js');
const Order = require('./models/Order.js');
const connectDB = require('./config/db.js');

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id
    const newProductList = products.map((product) => {
      const discount = product.discount
      const cost = product.cost
      return {
        ...product,
        user: adminUser,
        discountedCost: discount ? cost - (discount * cost) / 100 : cost,
      }
    })
    console.log(newProductList)

    await Product.insertMany(newProductList)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
