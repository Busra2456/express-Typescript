import type { Request, Response } from "express";

import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";


const createUser = async (req:Request,res:Response) => {
      // console.log(req.body)
      // const {name,email,password,age} = req.body;

       try {

            const result = await userService.createUserIntoDB(req.body);
     

     
      sendResponse(res,{
            statusCode : 201,
            success: true,
            message:"user created successfully",
            data:result.rows[0],
          
      });
}catch(error:any){
            sendResponse(res,{
            statusCode : 500,
            success: false,
            message:"error.message",
            data:error,
          
      });

      }
}

const getAllUser =async( req : Request, res : Response )=>{
      console.log("uuuuuuu",req.user)
try {
      const result = await userService.getAllUsersFromDB()
      // const result = await pool.query(`
      //       SELECT * FROM users
      //       `);
            res.status(200).json({
                  success:'true',
                  message:"users retrieved successfully",
                  data: result.rows,
            })
      
} catch (error :any) {
        res.status(200).json({
                  success:'false',
                  message:error.message,
                  error: error
            })

      
}

}

const getSingleUser = async(req:Request, res:Response)=>{
      const {id} = req.params;
      // console.log(id)
      try {
            const result = await userService.getSingleUsersFromDB(id as string)
           
                  if(result.rows.length === 0){
                          res.status(404).json({
                  success:'false',
                  message:"user Not found!",
                  data: {},
            })

                  }
                  console.log(result)
                   res.status(200).json({
                  success:'true',
                  message:"user retrieved successfully",
                  data: result.rows[0],
            })
            
      } catch (error:any) {
             res.status(200).json({
                  success:'false',
                  message:error.message,
                  error: error
            })
            
      }
}

const updatedUsers = async(req:Request,res:Response)=>{
      const {id} = req.params;
      // const {name,password,age,is_active} = req.body

      // console.log("Id",id);
      // console.log({name,Password,age,is_active})
      try {
       const result = await userService.updatedUserFromDB(req.body,id as string)

            if(result.rows.length === 0){
                          res.status(404).json({
                  success:'false',
                  message:"user Not found!",
                 
            })

                  };
            // console.log(result)
            res.status(200).json({
                  success:true,
                  message:"User updated successfully",
                  data:result.rows[0],
            })
            
      } catch (error:any) {
             res.status(500).json({
                  success:false,
                  message:"error.massage",
                  error:error,
                   })
            

            
      }
     
}

const deleteUsers =  async(req:Request,res:Response)=>{
      const {id} = req.params;
      try {
            const result = await userService.deleteUsersFromDB(id as string)
                  
            if(result.rowCount === 0){
                          res.status(404).json({
                  success:'false',
                  message:"user Not found!",
                 
            })

                  };
                   res.status(200).json({
                  success:true,
                  message:"User Deleted successfully",
                  data:{},
            })
            
      } catch (error:any) {
             res.status(500).json({
                  success:false,
                  message:"error.massage",
                  error:error,
                   })
            
      }

}

export const userController={
      createUser,
      getAllUser,
      getSingleUser,  
      updatedUsers,
      deleteUsers

 }