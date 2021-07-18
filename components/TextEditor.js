import  { useEffect, useState } from 'react'
import {convertFromRaw, EditorState} from "draft-js";
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import db from '../firebase';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module)=>module.Editor),
    { ssr: false }
  );

function TextEditor({email,id}) {

    const  [text, setText] = useState("");
    const [editorState, setEditorState] = useState(
        () =>  EditorState.createEmpty()
      );  

      const [snapshot] = useDocumentOnce(
        db.collection("userDocs").doc(email).collection("docs").doc(id)
      );
    
      
      useEffect(() => {
        if (snapshot?.data()?.editorState) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(snapshot?.data()?.editorState)
            )
          );
        }
      }, [snapshot]);
    

  
      
     const onEditorStateChange  = (editorState) => {
      
        setEditorState(
       editorState
        );

        db.collection("userDocs").doc(email).collection("docs").doc(id)
        .set({
            editorState:convertToRaw(editorState.getCurrentContent())
        },{
            merge:true
        })
      };

     

    return (
       <div >
        <Editor 
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center"
        editorClassName="mt-8 bg-white-500 px-4 rounded-lg shadow-md"
  
        />
        </div>
 
         
         
    )
}

export default TextEditor

export async function getServerSideProps(context){

    const session = await getSession(context);
  
  
    return{
        props:{
            session,
          
        },
    }
  }
  
