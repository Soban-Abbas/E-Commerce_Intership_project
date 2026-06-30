const {pool}=require("../../database/pool")
exports.RegisterUser=async(name, email , password, role)=>{
try {
    const result = await pool.query(`INSERT INTO users (name , email , password, role) VALUES ($1,$2,$3,$4) RETURNING *`,[name,email,password, role]
)

return result
} catch (error) {
throw error
}
}