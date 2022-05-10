/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const AwardMerits = ({ profile }) => {
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('');
  const [points, setPoints] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('merits')
      .insert([
        { notes: notes, type: type, points: points, profile_id: profile.id },
      ]);

    if (error) {
      alert(error.message);
    }

    if (data) {
      console.log(data);
      alert('Success');
    }
  };

  return (
    <div
      key={profile.id}
      className="w-full flex space-x-6 rounded-xl shadow-lg shadow-slate-800/30 p-3"
    >
      <img src="/images/avatar.png" alt="" className="h-16 w-16 rounded" />
      <div className="flex flex-1 flex-col">
        <p className="text-sm text-slate-700 font-medium">{`${profile.firstname} ${profile.lastname}`}</p>
        <p className="text-sm text-slate-700 font-medium">{`Username: ${profile.username}`}</p>

        <form className="w-full mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="notes"
              className="text-xs text-gray-700 font-medium"
            >
              Notes
            </label>
            <input
              type="text"
              name="notes"
              id="notes"
              placeholder="Notes"
              className="text-gray-600 mt-1 focus:outline-none bg-slate-200 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded shadow border-0"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="type" className="text-xs text-gray-700 font-medium">
              Merits Type
            </label>
            <select
              type="text"
              name="type"
              id="type"
              className="text-gray-600 mt-1 focus:outline-none bg-slate-200 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded shadow border-0"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="points"
              className="text-xs text-gray-700 font-medium"
            >
              Points
            </label>
            <input
              type="number"
              name="points"
              id="points"
              value={points}
              className="text-gray-600 mt-1 focus:outline-none bg-slate-200 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded shadow border-0"
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="my-2 bg-sky-700 transition duration-150 ease-in-out hover:bg-sky-600 rounded text-white px-6 py-2 text-xs"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AwardMerits;
