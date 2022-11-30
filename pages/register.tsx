import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import {useDropzone} from "react-dropzone"
import Page from "../components/Page";
import supabase from "../lib/supabase";

const register = () => {

  const router = useRouter()

const [loading, setLoading] = useState(false)
const [imageSrc, setImageSrc] = useState('')

const upLoadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

const handleImageUpload = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)

 const {image} = Object.fromEntries(new FormData(e.currentTarget))

 console.log(image)

  // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

 const formData = new FormData()

 formData.append('file', image)
 if(upLoadPreset) {
   formData.append("upload_preset", upLoadPreset);
 }

 const data = await fetch(
   `https://api.cloudinary.com/v1_1/merits/image/upload`,
   {
     method: "POST",
     body: formData,
   }
 )
   .then((r) => r.json())
   .catch((err) => err.json());
 console.log({data})

 setImageSrc(data.secure_url)


setLoading(false)

}





 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setLoading(true)


     const { username, firstname, lastname, password, email } = Object.fromEntries(new FormData(e.currentTarget));

     console.log(typeof username)


     if(
      typeof username != 'string' ||
      typeof firstname != 'string' ||
      typeof lastname != 'string' ||
      typeof password != 'string' ||
      typeof email != 'string'
     ) throw new Error('Please enter valid data')


     let { error, data } = await supabase.auth.signUp({
       password,
       email,
       options: {
         data: {
           username:username,
           firstname:firstname,
           lastname:lastname,
           avatar_url: imageSrc,
         },
       },
     });

     if(error) {
      alert(`There was an error: ${error.message}`)
      setLoading(false)
    } else if(data.user) {
      alert(`Success, please login.`)
      setLoading(false)
      router.push('/')
    } else {
      alert(`There was an error registering, try again later`)
      setLoading(false)
     }

 }




  return (
    <Page title="Register An Account">
      <div className="p-4 bg-purple-800 h-screen">
        <h1 className="text-center text-white text-lg font-medium">
          Register An Account
        </h1>
        <form
          onSubmit={handleImageUpload}
          className="mt-4 border border-dashed text-sm text-white flex justify-between items-center font-medium border-gray-500 rounded-lg p-4"
        >
          <input type="file" name="image" id="image" className="text-xs" />
          <button className="bg-white text-xs text-slate-800 px-4 py-1 rounded outline-none">
            Save
          </button>
        </form>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-50"
            >
              {" "}
              Email{" "}
            </label>
            <input
              id="email"
              name="email"
              required
              aria-labelledby="email"
              type="email"
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="e.g: john@gmail.com "
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none text-gray-50"
            >
              {" "}
              Username{" "}
            </label>
            <input
              id="username"
              name="username"
              aria-labelledby="username"
              type="text"
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="username"
            />
          </div>{" "}
          <div>
            <label
              htmlFor="firstname"
              className="text-sm font-medium leading-none text-gray-50"
            >
              {" "}
              First Name{" "}
            </label>
            <input
              id="firstname"
              name="firstname"
              aria-labelledby="given-name"
              autoComplete="given-name"
              type="text"
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="First Name"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="text-sm font-medium leading-none text-gray-50"
            >
              {" "}
              Last Name{" "}
            </label>
            <input
              id="lastname"
              name="lastname"
              aria-labelledby="lastname"
              type="text"
              autoComplete="last-name"
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none text-gray-50"
            >
              {" "}
              Password{" "}
            </label>
            <input
              id="password"
              name="password"
              aria-labelledby="password"
              type="password"
              autoComplete="last-name"
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"

            />
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-300 text-gray-200"
                : "bg-purple-50 text-purple-800"
            } rounded  mt-4 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 ${
              loading ? "text-gray-100" : ""
            } lg:max-w-[144px] w-full `}
          >
            Register
          </button>
        </form>{" "}
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
            OR
          </p>
          <hr className="w-full bg-gray-400" />
        </div>
      </div>
    </Page>
  );
};
export default register;
