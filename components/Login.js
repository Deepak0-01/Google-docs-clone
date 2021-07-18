import Button from "@material-tailwind/react/Button"
import { getSession, signIn, signOut } from "next-auth/client"
import Image from "next/image"


function Login() {
 
    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen  ">

        <div className="flex-col justify-center items-center min-h-screen py-2">

        <Image src="https://links.papareact.com/1ui"

        width="400"
        height="550"
        objectFit="contain"
        className="h-40"
       
        />
        
        <Button
        color="blue"
        buttonType="fill"
        size="regular"
        rounded={false}
        block={false}
        iconOnly={false}
        ripple="dark"
        className=" h-10 w-44 m-auto  border-0 bg-blue-400 "
    > 
       <h2 onClick={signIn} > Login With Google</h2> 
        </Button>

        </div>
            
        </div>
    )
}

export default Login

export async function getServerSideProps(context){

    const session = await getSession(context);
 

    return{
        props:{
            session,
          
        },
    }
}
