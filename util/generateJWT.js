const jwt=require("jsonwebtoken");
exports.generateJwt=(id,email,role)=>{
    const payload={
        id:id,
        email:email,
        role:role
    }
    const secretKey = process.env.secretKey;
const expiresIn={
    expiresIn:'1h'
}

let   token = jwt.sign(
 payload,
 secretKey,
 expiresIn
);


return token

}