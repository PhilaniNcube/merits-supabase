import React, { Fragment, useMemo, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchools } from '../../../lib/getSchools';
import { supabase } from '../../../utils/supabase';
import { useUser } from '../../../context/AuthContext';

const AddEvent = () => {
  const { user } = useUser();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [school, setSchool] = useState('');

  const [venue, setVenue] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);

  const { data: schools } = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleFileUpload = async (e) => {
    setLoading(true);
    if (!e.target.files || e.target.files.length === 0) {
      alert('You must select an image to upload.');
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${fileName}`, file);

    console.log({ data, error });

    const fileUrl = data.Key;

    setImage(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`,
    );
    setLoading(false);
  };

  console.log({ school, user });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from('event').insert([
      {
        name: name,
        description: description,
        date: date,
        time: time,
        school_id: school,

        venue: venue,
        image: image,
      },
    ]);

    console.log({ data, error });

    if (error) {
      alert('There was an error saving the event: ' + `${error.message}`);
    }

    if (data) {
      setName('');
      setDescription('');
      setVenue('');
      setTime('');
      setDate('');
      setSchool('');
      setImage('');
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <div className="flex items-center justify-center py-8 px-4">
          <div className="relative w-96 rounded shadow-lg p-6 dark:bg-gray-800 bg-white">
            <p className="text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
              Add an event
            </p>
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Event Name{' '}
                </label>
                <input
                  placeholder="Enter event name"
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
                  htmlFor="description"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Event Description{' '}
                </label>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  type="text"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                ></textarea>
              </div>

              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="venue"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Event Venue{' '}
                </label>
                <input
                  placeholder="Enter event venue"
                  name="venue"
                  id="venue"
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>

              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="date"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Event Date{' '}
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Enter city"
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="time"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  {' '}
                  Event Time (24hr Clock)
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Enter city"
                  className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="school"
                  className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                >
                  Schools
                </label>
                <div className="py-3 rounded-lg px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 mt-2">
                  <select
                    id="school"
                    name="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="text-xs focus:outline-none font-medium leading-3 text-gray-600 dark:text-gray-100 bg-transparent w-full"
                  >
                    <option disabled>Select a school</option>
                    {schools.map((school) => {
                      return (
                        <option
                          className="px-3 text-gray-600"
                          key={school.id}
                          value={school.id}
                        >
                          {school.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="my-3 w-full">
                <label
                  htmlFor="image"
                  className="pb-2 text-xs max-w-[40ch] font-medium text-gray-50"
                >
                  {image === '' ? `Upload Image ` : `Image Uploaded`}
                </label>
                <input
                  className="form-control m-0focus:text-gray-700 block w-full rounded-md  px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none bg-gray-50 dark:bg-gray-700"
                  onChange={handleFileUpload}
                  type="file"
                  name="image"
                  id="image"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                id="submit"
                className="mt-5 focus:outline-none px-5 py-3 bg-sky-700 dark:bg-sky-600 hover:bg-opacity-80 rounded text-xs font-semibold leading-3 text-gray-100"
              >
                {loading ? 'Loading..' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddEvent;

export const getServerSideProps = async () => {
  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
