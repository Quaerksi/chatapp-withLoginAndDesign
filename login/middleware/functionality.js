let User;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.createModel = (connUser) =>{
    User = require("../model/user").connUser(connUser);
}

exports.register = async function(req, res) {

    try {
        // Get user input
        // const { firstName, lastName, email, password1, password2 } = req.body;
        const { nickname, email, password1, password2 } = req.body;
        console.log(`Post register ${firstName}, ${lastName}, ${email}, ${password1}, ${password2}`)

        // input is required in html
        // if (!(email && password1 && password1 && firstName && lastName)) {
        //     res.status(400).redirect(`/register?error=All_input_is_required`);//.send("All input is required");
        // }
        let vaildate = false;

        if(!(password1 === password2)){
            vaildate = true;
            res.status(400).redirect(`/register?error=Passwords_must_be_identical`);//.send("Passwords must be identical");
        }

        //all data is there
        const password = password1;

        const oldUser = await User.findOne({ email }).exec();
        console.log(`await findOne ${oldUser}`)

        if(oldUser == null && !vaildate){ 
            //Encrypt user password
            encryptedUserPassword = await bcrypt.hash(password, 10);
            // const encryptedUserPassword = bcrypt.hash(password, 10);

            // Create user in our database
            const user = await User.create({
                first_name: firstName,
                last_name: lastName,
                email: email.toLowerCase(), // sanitize
                password: encryptedUserPassword
            });

            // Create token
            const token = jwt.sign(
                { user_id: user._id},
                process.env.TOKEN_KEY,
                // {
                // expiresIn: "5h",
                // }
            );
            // save user token
            user.token = token;

            // return new user
            res.status(201).redirect(`/`);
       
        } else if (oldUser != null && !vaildate){
            //handle user exists already
            res.status(409).redirect(`/register?error=User_Already_Exist`);
        }
    } catch (err) {
        console.log(err);
    }
}

exports.login = async function(req, res) {

    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email }).exec();
        // console.log(`1`)
        if (user && (await bcrypt.compare(password, user.password))) {
            // console.log(`2`)
            const token = jwt.sign({ email: email },  process.env.TOKEN_KEY);
            return res
            .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            // secure: true
            })
            .status(200)
            // .json({ message: "Logged in successfully 😊 👌" })
            .redirect(`/index`);
            //  return true;
        
        }

        return res.status(400)
        .redirect(`/?error=Incorrect_Credential`);
        }catch(err){
            console.log(err);
        }
}

exports.logout = async function (req, res){

    try {
        return res
        .clearCookie("access_token")
        .status(200)
        .redirect(`/`);
    }catch(err){
        console.log(err);
    }
}