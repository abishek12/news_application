// library package
import bcrypt from "bcryptjs";
import Joi from "joi";
import nodemailer from "nodemailer";

// Import Model
import { User } from "../../users/model/UserModel.js";
import { Refer } from "../../users/model/ReferModel.js";

export const registerUserController = async (req, res) => {
  try {
    // validation from server-side
    let schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .required(),
      referralCode: Joi.string().allow(""),
      role: Joi.string()
        .valid("Customer", "Seller", "Admin")
        .default("Customer"),
    });

    let { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });

    // any error does not occur than; process for login
    let { firstName, lastName, email, password, role } = req.body;
    let referralCode = req.query.ref;

    // if role is empty or not provided
    if (!role) role = "Customer";

    // encrypt password
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    // check user exists or not
    let userItem = await User.findOne({
      where: {
        email,
      },
    });

    // If user items is not found
    if (userItem !== null) {
      return res.status(200).json({
        status: 200,
        message: "Account already exists",
      });
    }

    // setup nodemailer
    // let transporter = nodemailer.createTransport({
    //     service: process.env.NODEMAILER_SERVICE,
    //     auth: {
    //         user: process.env.NODEMAILER_EMAIL,
    //         pass: process.env.NODEMAILER_PASSWORD,
    //     }
    // });

    // let mailOptions = {
    //     from: process.env.NODEMAILER_EMAIL,
    //     to: email,
    //     subject: 'Welcome To E-Commerce Application',
    //     text: 'That was easy!'
    // };

    // register user to database
    let value = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    }).then((_) => {
      // transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //         console.log(error);
      //     } else {
      //         console.log('Email sent: ' + info.response);
      //     }
      // });
    });


    // if user is registered from referal code.
    if (referralCode) {
      let referrer = await Referral.findOne({ referralCode });
      if (referrer) {
        // Add the referred user to the referrer's record
        referrer.referredUsers.push({ user: value._id });
        await referrer.save();

        // Reward the referrer
        const referrerUser = await User.findById(referrer.user);
        referrerUser.points += process.env.REFER_POINTS; // Award points to the referrer
        await referrerUser.save();
      }
    }

    // display message to user
    return res.status(201).json({
      status: 201,
      message: "Account has been created",
      value,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
