import { useState } from "react";
import Layout from "../../../components/Layout";
import supabase from "../../../lib/supabase";

const create = () => {


const [loading, setLoading] = useState(false);
const [imageSrc, setImageSrc] = useState("");

const upLoadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const { image } = Object.fromEntries(new FormData(e.currentTarget));

  console.log(image);

  // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

  const formData = new FormData();

  formData.append("file", image);
  if (upLoadPreset) {
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
  console.log({ data });

  setImageSrc(data.secure_url);

  setLoading(false);
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true)


   const { name, streetAddress, city, postalCode } = Object.fromEntries(
     new FormData(e.currentTarget)
   );

   console.log({ name, streetAddress, city });

   const { data, error } = await supabase
     .from("school")
     .insert([{ name, streetAddress, city, postalCode, image: imageSrc }])
     .select("*");

     console.log({data, error})

   setLoading(false)
};



  return (
    <Layout>
      <div className="mt-3 px-4 ">
        <h1 className="text-purple-800 font-medium text-xl">Add A School</h1>
        <form
          onSubmit={handleImageUpload}
          className="mt-4 border border-dashed text-sm text-slate-800 flex justify-between items-center font-medium border-gray-500 rounded-lg p-4"
        >
          <input
            type="file"
            name="image"
            id="image"
            className="text-xs border-none"
          />
          <button className="bg-white text-xs text-slate-800 px-4 py-1 rounded outline-none">
            Save
          </button>
        </form>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col md:mr-16">
            <label
              htmlFor="name"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-xs border-gray-300 rounded border shadow"
              placeholder="School Name"
            />
          </div>
          <div className="flex flex-col mt-4 md:mr-16">
            <label
              htmlFor="streetAddress"
              className="text-gray-800 dark:text-gray-100 text-xs font-bold leading-tight tracking-normal mb-2"
            >
              Street Address
            </label>
            <input
              id="streetAddress"
              name="streetAddress"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-xs border-gray-300 rounded border shadow"
              placeholder="Street Address"
            />
          </div>
          <div className="flex flex-col mt-4 md:mr-16">
            <label
              htmlFor="postalCode"
              className="text-gray-800 dark:text-gray-100 text-xs font-bold leading-tight tracking-normal mb-2"
            >
             Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-xs border-gray-300 rounded border shadow"
              placeholder="Postal Code"
            />
          </div>
          <div className="flex flex-col mt-4 md:mr-16">
            <label
              htmlFor="city"
              className="text-gray-800 dark:text-gray-100 text-xs font-bold leading-tight tracking-normal mb-2"
            >
             City
            </label>
            <input
              id="city"
              name="city"
              required
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-xs border-gray-300 rounded border shadow"
              placeholder="City"
            />
          </div>

          <button
          disabled={loading || imageSrc === ''}
            className={`${
              loading
                ? "bg-purple-200 text-purple-100"
                : "bg-purple-800 text-purple-50"
            } mt-3 w-1/2 px-8 py-2 rounded-lg shadow`}
          >{loading ? 'Loading...' : 'Save'}</button>
        </form>
      </div>
    </Layout>
  );
};
export default create;
