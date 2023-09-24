import React, { useState } from 'react'
import {db, storage} from "../firebase/firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";
import { collection, doc, setDoc } from 'firebase/firestore';

interface UpdateProps {
  title: string | undefined;
  onImageUpload: () => void;
}

const Update = ({ title, onImageUpload }: UpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const [isUploading, setIsUploading] = useState(false);


  const uploadImg = async (data: any) => {
    if (data == undefined) {
      alert("画像を選択してください")
      return
    } else {
      setIsUploading(true);
    console.log(data);
    const storageRef = ref(storage);

    // 新しいドキュメントのリファレンスを作成し、そのIDを取得する
    const docRef = doc(collection(db, "post_pop"));
    const newDocId = docRef.id;

    const fileRef = ref(storageRef, 'file/' + data.img[0].name);

    try {
      await uploadBytes(fileRef, data.img[0]);

      const imgUrl = await getDownloadURL(fileRef);
      console.log(imgUrl);
      console.log(title)
      // 新しいドキュメントのIDをpostDataに追加
      const postData = {
        id: newDocId,
        title:title,
        img: imgUrl,
      };
      console.log(postData,onImageUpload)
      await setDoc(docRef, postData);
      console.log("success");
      setValue("img", null)
      setIsUploading(false);
      alert("アップロードしました")
      onImageUpload();
    } catch (error) {
      console.error("Error uploading image and saving document:", error);
    }
    }
  }
  return (
    <div className='upload-wrapper my-4 ml-4'>
      <form onSubmit={handleSubmit(uploadImg)}>
        <label htmlFor="file-upload" className="custom-file-upload">
          ファイルを選択
        </label>
        <input id="file-upload" type="file" {...register("img")} className='file-input'/>
        <button type="submit" className="submit-button">アップロード</button>
      </form>
      {isUploading && (
        <div className="uploading-modal">
          アップロードしています...
        </div>
      )}
    </div>
  )
}

export default Update
