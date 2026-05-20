import bcrypt from "bcryptjs";
import { pool } from "../../db/index"
import type { IUser } from "./user.interface";

const createUserIntoDB = async(payLoad : IUser)=>{
      const {name,email,password,age,role} = payLoad;
      const hashPassword = await bcrypt.hash(password,10)
      console.log(hashPassword)
       const result = await pool.query(`
            INSERT INTO users(name,email,password,age,role) VALUES($1,$2,$3,$4,COALESCE($5,'user')) RETURNING *`,[name,email,hashPassword,age,role]);
            delete result.rows[0].password;
            return result;

}

const getAllUsersFromDB = async () =>{
       const result = await pool.query(`
            SELECT * FROM users
            `);
            return result;
}

const getSingleUsersFromDB = async (id:string) =>{
       const result = await pool.query(`
                   SELECT * FROM users WHERE id=$1

                  `,[id]);
                  return result

}

const updatedUserFromDB = async ( payLoad : IUser, id : string ) =>{
      const {name,password,age,is_active} = payLoad;
       const result = await pool.query(`
                UPDATE users 
                SET 
                name=COALESCE($1,name),
                password=COALESCE($2,password),
                age=COALESCE($3,age),
                is_active=COALESCE($4,is_active) 
              
                WHERE id=$5 RETURNING *
            `,
            [name,password,age,is_active,id]);
            return result
}

const deleteUsersFromDB = async (id : string) =>{
      const result = await pool.query(`
                  DELETE FROM users WHERE id=$1
                  `,[id],);
                  return result
}

export const userService = {
      createUserIntoDB,
      getAllUsersFromDB,
      getSingleUsersFromDB,
      updatedUserFromDB,
      deleteUsersFromDB  

};