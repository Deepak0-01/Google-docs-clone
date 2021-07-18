import Head from "next/head";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";

function Header() {
  const [session] = useSession();
  return (
    <header className="flex items-center sticky top-0 z-50 shadow-md bg-white">
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <Button
      color="gray"
      buttonType="outline"
      size="regular"
      rounded={true}
      block={false}
      iconOnly={true}
      ripple="dark"
      className=" h-20 w-20 border-0"
  > 
   <Icon name="menu" size="3xl"/>

  </Button>

  <Icon name="description" color="blue" size="5xl"/>
  <h1 className="text-gray-600 ml-2 text-2xl">Docs</h1>

  <div className="flex items-center mr-4 px-5 py-1 flex-grow bg-gray-200 ml-5 rounded-lg focus-within:shadow-md focus-within:text-gray-600 ">
  <Icon name="search" size="3xl" color="gray" />
  <input type="text" placeholder="Search" 
  className="text-gray-600 px-2 flex-grow outline-none  bg-transparent"/>
  
  </div>
  <Button
  color="gray"
  buttonType="outline"
  size="regular"
  rounded={true}
  block={false}
  iconOnly={true}
  ripple="dark"
  className=" h-20 w-20 border-0"
> 
  <Icon name="apps" size="3xl" />
  </Button>
  <img
  src={session?.user?.image}
  loading="lazy"
  onClick={signOut}
  className="h-8 w-8 m-2 rounded-full"
  />
      
    </header>
  );
}

export default Header;
