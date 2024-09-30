const fs = require('fs');
const mongoose = require('mongoose');

const Product = require('../../models/productModel');

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(db).then(() => {
  console.log('DB connection successful!');
});
const product = JSON.parse(fs.readFileSync(`${__dirname}/products.json`));

const importData = async () => {
  try {
    await Product.create(product);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err.message);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
