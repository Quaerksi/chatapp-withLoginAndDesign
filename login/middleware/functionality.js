var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = process.env;

let User;
//!!!!!Use only for displaying users online!!!!!!!!
var registeredToken = []

exports.createModel = (connUser) =>{
    User = require("../model/user").connUser(connUser);
}

exports.register = async function(req, res) {

    try {
        // Get user input
        const { nickname, email, password1, password2 } = req.body;
        // console.log(`Post register ${nickname}, ${email}, ${password1}, ${password2}`)

        let vaildate = false;

        const nicknameExists = await User.findOne({ nick_name: nickname }).exec();
        if(nicknameExists != null){
            vaildate = true;
            res.status(400).redirect(`/register?error=Nickname_must_be_unique`);
        }

        if(!(password1 === password2) && !vaildate){
            vaildate = true;
            res.status(400).redirect(`/register?error=Passwords_must_be_identical`);
        }

        //all data is there
        const password = password1;

        const userExists = await User.findOne({ email }).exec();
        // console.log(`await findOne ${oldUser}`)

        if(userExists == null && !vaildate){ 
            //Encrypt user password
            encryptedUserPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await User.create({
                nick_name: nickname,
                email: email.toLowerCase(),
                password: encryptedUserPassword
            });

            // Create token
            const token = jwt.sign(
                { nickname: nickname},
                process.env.TOKEN_KEY,
            );
            // save user token
            user.token = token;

            // return new user
            res.status(201).redirect(`/`);
       
        } else if (userExists != null && !vaildate){
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
        const { nickname, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ nick_name: nickname }).exec();
        // console.log(`1`)
        if (user && (await bcrypt.compare(password, user.password))) {
            // console.log(`2`)
            const token = jwt.sign({ nickname: nickname },  process.env.TOKEN_KEY);
            registeredToken.push(token)
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

        registeredToken=registeredToken.filter(token => token != req.cookies.access_token)

        return res
        .clearCookie("access_token")
        .status(200)
        .redirect(`/`);
    }catch(err){
        console.log(err);
    }
}
