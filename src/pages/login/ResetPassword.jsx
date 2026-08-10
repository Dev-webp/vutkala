

import React , {useState} from "react";

import {useSearchParams , useNavigate  } from "react-router-dom";

import {resetPassword} from "../../services/authService";

import "./ResetPassword.css"

function ResetPassword (){


    const [formData ,setFormData] = useState({
        password:"",
        confirmPassword:"",
    });

    const[searchParams] = useSearchParams();

    const navigate = useNavigate();
    
    const token = searchParams.get("token");

    
    const [error,setError] = useState("");
    const [success , setSuccess] = useState("") ;

    const handleChange = (e) =>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");
        if(!formData.password || !formData.confirmPassword){
            setError("please fill all fields");
            return ;
        }

        try{
            const response = await resetPassword({
                token,
                password:formData.password,

                confirmPassword:formData.confirmPassword,

            });

            setSuccess(response.data.message);

            setTimeout(()=>{
                navigate("/login");
            },2000);
        }
        catch(error){

            if(error.response){
                setError(error.response.data.message);
            }
            else{
                setError("something went error");
            }
        }
    };
    return(<div className="reset-container">

        <div className="reset-card">

            <h1> Reset Password</h1>

            <p> Create a new password</p>

            <form onSubmit={handleSubmit}>

            <input type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange} />


            <input type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange} />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit">Reset paassword</button>


            </form>


        </div>






    </div>)

}


export default ResetPassword;