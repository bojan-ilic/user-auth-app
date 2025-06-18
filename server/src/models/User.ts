/**
 * @desc    Mongoose User model with password hashing and comparison
 */

import mongoose, {Document, Types, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for User document
export interface IUser extends Document {
	_id: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	comparePassword: (candidatePassword: string) => Promise<boolean>; // Method to compare hashed password
}

// Define User schema
const userSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		}
	},
	{timestamps: true} // Automatically add createdAt and updatedAt fields
);

// Middleware to hash password before saving, only if modified
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next(); // Skip if password is unchanged
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt); // Hash and set password
	next();
});

// Compare provided password with hashed password
userSchema.methods.comparePassword = function (candidatePassword: string) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model with the IUser document type
const User = mongoose.model<IUser>('User', userSchema) as mongoose.Model<IUser>;

export default User;
