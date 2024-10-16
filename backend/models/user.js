import mongoose from "mongoose";

// Check that name contains at least two unique characters
const hasNonUniqueChars = (name) => !/^(.)\1+$/i.test(name);

// Check that email is a valid email address
// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
const isValidEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email);

// Check that email is not from the domain "example.com"
const isNotExampleCom = (email) => !/example\.com$/.test(email);

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "The name cannot be blank"],
      minLength: [4, "The name must be at least four characters long"],
      validate: [hasNonUniqueChars, "The name must contain at least two unique characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "The email cannot be blank"],
      validate: [
        { validator: isValidEmail, message: "The email must be a valid email address" },
        { validator: isNotExampleCom, message: "The email must not be from the domain 'example.com'" },
      ],
      index: {
        //https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive
        unique: true,
        collation: { locale: "en", strength: 2 },
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // assign created_at and updated_at fields
  }
);

// Create an index on the 'email' field to enforce uniqueness
userSchema.index({ email: 1 });

// Create and export a model for 'users' collection using the schema
export default mongoose.model("User", userSchema);
