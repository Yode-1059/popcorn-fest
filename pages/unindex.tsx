import Image from 'next/image'
import { getStorage, ref } from "firebase/storage";
import {storage} from "../firebase/firebase"

export default function Home() {
  const imgeRef = ref(storage, "file/コスチューム2.png")

  const rootRef = imgeRef.root;
  const imgsRef = imgeRef.parent

  console.log(rootRef,imgsRef,imgeRef.name,imgeRef.bucket,imgeRef.fullPath)

  return (
    <>
    <p>てすや</p>
    </>
  )
}
