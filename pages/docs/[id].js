import Icon from "@material-tailwind/react/Icon";
import { getSession, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

import Button from "@material-tailwind/react/Button";
import db from "../../firebase";
import Head from "next/head";
import TextEditor from "../../components/TextEditor";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Login from "../../components/login";

function Doc() {
  const [doc, setDoc] = useState([]);
  const [session] = useSession();
  const router = useRouter();

  if (!session) return <Login />;

  useEffect(() => {
    db.collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
      .onSnapshot((snapshot) => {
        setDoc(snapshot.data());
      });
  }, []);

  const id = router.query.id;

  const handleSignOut = () => {
    signOut();

    router.replace("/");
  };

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <span className="flex items-center justify-between ">
        <div className="flex items-center  m-4 cursor-pointer">
          <Icon
            onClick={() => router.push("/")}
            name="article"
            color="blue"
            size="5xl"
          />
          <div className=" h-10">
            <h1 className="text-gray-600 ml-2 text-2xl">{doc?.filename}</h1>
            <div className="flex items-center ml-2 text-gray-700">
              <p className="m-1">File</p>
              <p className="m-2">Edit</p>
              <p className="m-2">View</p>
              <p className="m-2">Insert</p>
              <p className="m-2">Format</p>
              <p className="m-2">Tools</p>
            </div>
          </div>
        </div>

        <img
          onClick={handleSignOut}
          className="mr-6 rounded-full h-10 w-10"
          src={session?.user?.image}
          alt="user_image"
        />
      </span>

      <div className="max-w-5xl m-auto mt-6">
        <TextEditor email={session.user.email} id={router.query.id} />
      </div>
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
