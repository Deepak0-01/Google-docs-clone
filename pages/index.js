import Head from "next/head";
import Header from "../components/Header";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/login";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import db from "../firebase";
import firebase from "firebase";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

function Home() {
  const [session] = useSession();

  if (!session) return <Login />;

  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session?.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const handleSubmit = () => {
    if (!input) {
      alert("Please Enter Document Name");
      return;
    }

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  };


  const modal = (
    <Modal
      size="regular"
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalHeader toggler={() => setShowModal(false)}>
        New Document
      </ModalHeader>
      <ModalBody className="focus-within:text-gray-300 border-transparent">
        <input
          placeholder="Enter Document Name"
          type="text"
          className="border-transparent decoration-none px-2 bg-gray-200 h-10 w-70 text-gray-700"
          onChange={(e) => setInput(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="outline"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Close
        </Button>

        <Button color="blue" onClick={handleSubmit} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="ml-5 bg-[#F1F3F4] py-8">
        <div className="max-w-3xl mx-auto ">
          <div className="flex items-center justify-between my-4">
            <h2 className="text-gray-600">Start a new document</h2>
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
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div
            onClick={(e) => setShowModal(true)}
            className="relative h-52 w-40 border-2 hover:border-blue-600 cursor-pointer "
          >
            <Image src="https://links.papareact.com/pju" layout="fill" />
          </div>

          <p className="ml-2 mt-2 text-gray-600 text-sm font-semibold">Blank</p>
        </div>
      </section>
      <section className="max-w-3xl m-auto bg-white py-10">
        <div className="flex items-center justify-between text-sm text-gray-700 ">
          <h2 className="font-medium flex-grow">My Documents</h2>
          <h2 className="font-medium mr-5">Date Created</h2>
          <Icon name="folder" size="3xl" color="gray" />
        </div>
      </section>

      {snapshot?.docs.map((doc) => (
        <DocumentRow
          key={doc.id}
          id={doc.id}
          file={doc.data().filename}
          date={doc.data().timestamp} 
        />
      ))}
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
