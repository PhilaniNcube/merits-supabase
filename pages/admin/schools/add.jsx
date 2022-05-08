import React, { Fragment, useState } from 'react';
import useSupabase from '../../../utils/supabase';
import { useRouter } from 'next/router';

const Add = () => {
  const { supabase } = useSupabase();

  const router = useRouter();

  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');

  const [loadings, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('school')
      .insert([{ name: name, streetAddress: streetAddress, city: city }]);

    console.log({ data, error });

    if (error) {
      alert(error.message);
    }

    if (data) {
      setName('');
      setStreetAddress('');
      setCity('');
      router.push('/admin/schools/add');
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <div className="flex items-center justify-center py-8 px-4">
          <div className="relative w-96 rounded shadow-lg p-6 dark:bg-gray-800 bg-white">
            <p className="text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
              Add a school
            </p>
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  School Name{' '}
                </label>
                <input
                  placeholder="Enter school name"
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="streetAddress"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Street Address{' '}
                </label>
                <input
                  placeholder="Enter street address"
                  name="streetAddress"
                  id="streetAddress"
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="city"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  City{' '}
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>
              <button
                id="submit"
                className="mt-5 focus:outline-none px-5 py-3 bg-sky-700 dark:bg-sky-600 hover:bg-opacity-80 rounded text-xs font-semibold leading-3 text-gray-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Add;
