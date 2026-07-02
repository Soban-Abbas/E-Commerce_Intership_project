const{pool}=require("../../database/pool");


exports.addProductToDataBase=async(name,sku,quantity,price,category,productOwnerId)=>{
try {
    const result = await pool.query(`insert into products(name,sku,quantity,price,category,productOwnerId) values ($1,$2,$3,$4,$5,$6) returning *`,[name,sku,quantity,price,category,productOwnerId])
    return result
}catch (error) {
    error.status=400
    throw error
}
}

exports.getProducts=async()=>{

    try {
        const results=await pool.query('select * from products')
        return results;
    } catch (error) {
        throw error
    }

}


exports.deleteProduct=async(id,ProductOwnerId)=>{
    try {
        const result = await pool.query('delete from products where id=$1 AND productOwnerId=$2', [id, ProductOwnerId])
        return result;
    } catch (error) {
        throw error
    }
}