import { useQuery } from '@tanstack/react-query';
import React from 'react'
import getLeaderboard from '../lib/getLeadeboard';

const Leaderboard = () => {

    const {
      data: leaderboard,
      isLoading,
      isSuccess,
    } = useQuery(["leaderboard"], getLeaderboard);

  return (
    <div className="w-full">
      <table className="shadow  text-left w-full">
        <thead>
          <tr className="border-b px-2 w-full border-gray-300 dark:border-gray-700 text-white">
            <th className="py-5  text-base ">Avatar</th>
            <th className="py-5  text-base ">Username</th>
            <th className="py-5  text-base ">Points</th>
          </tr>
        </thead>
        <tbody className="w-full px-2">
          {leaderboard?.map((item) => (
            <tr key={item.id}>
              <td className=" pl-2 pr-2 py-5 ">
                <img
                  src={item.avatar}
                  className="h-10 w-10 rounded-full border border-white"
                />
              </td>
              <td className="pr-2 py-5 ">{item.username}</td>
              <td className="pr-2 py-5  text-center">{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard
