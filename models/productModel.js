const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    enum: [
      "Apple",
      "Dell",
      "HP",
      "Lenovo",
      "ASUS",
      "Acer",
      "Microsoft",
      "Razer",
      "MSI",
      "Samsung",
      "Toshiba",
      "LG",
      "Huawei",
      "Gigabyte",
      "VAIO",
    ],
    require: [true, "A product must have brand name"],
  },
  model: {
    type: String,
    require: [true, "A product must model name"],
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  specifications: {
    processor: {
      type: String,
      require: true,
    },
    ram: {
      type: String,
      require: true,
    },
    storage: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      default: "Integrated", // Not all laptops have dedicated GPUs
    },
    batteryLife: String,
    weight: String,
    os: {
      type: String,
      enum: ["Windows", "macOS", "Linux", "Chrome OS"],
    },
    ports: [String], // e.g. ['USB-C', 'HDMI', 'Ethernet']
    warranty: {
      type: String,
      default: "1 year",
    },
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
