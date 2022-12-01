import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState, Fragment } from 'react'
import getProfile from '../lib/getProfile';
import { getSchools, School } from '../lib/getSchools';
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";


const UpdateAccount = () => {



   const router = useRouter();
    const supabase = useSupabaseClient();
   const [loading, setLoading] = useState(false);
   const [imageSrc, setImageSrc] = useState("");

   const {data:schools, isLoading:schoolsLoading, isSuccess:schoolsSuccess, isError:schoolsError} = useQuery(['schools'], getSchools)

   const user = useUser();

       const {
         data: profile,
         isLoading,
         isSuccess,
       } = useQuery(["profile"], async () => {
         if (typeof user == null || typeof user == "undefined") {
           throw new Error();
         } else {
           return getProfile(user?.id!);
         }
       });

   const [schoolId, setSchoolId] = useState(profile?.school_id || "");


 const [selected, setSelected] = useState(profile ? schools?.find(el => el.id === profile.school_id) : null);
 const [query, setQuery] = useState("");

 const filteredSchools =
   query === ""
     ? schools
     : schools?.filter((school) =>
         school.name
           .toLowerCase()
           .replace(/\s+/g, "")
           .includes(query.toLowerCase().replace(/\s+/g, ""))
       );





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
     setLoading(true);

     console.log('hello')

     setLoading(false)

   };


  return (
    <div className="w-full px-4 py-2">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="font-medium text-slate-800 text-2xl">Update Your Details</h1>
        <div className="mt-2 grid grid-cols-6 gap-2">
          <div className="col-span-6 sm:col-span-3">
            {schoolsSuccess && (
              <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <p className="text-xs text-slate-700 pl-2">Update Your School</p>
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(school:School) => school?.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredSchools?.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredSchools?.map((school) => (
                          <Combobox.Option
                            key={school.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={school}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {school.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateAccount
