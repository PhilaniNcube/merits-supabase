import { UserCircleIcon } from "@heroicons/react/solid";

const MyLeaderboard = ({leaderboard}) => {
   console.log({ leaderboard });

  return <div className="px-4 py-4 bg-purple-900 rounded-b-xl">
      {leaderboard.map((item, i) => {
        return (
          <div key={item.id} className="mb-1 py-2 px-3 bg-purple-800 flex items-center justify-between rounded-sm">
          <span className="flex space-x-2 items-center">
           <small className="text-xs text-white">{i + 1}</small>
           <UserCircleIcon className="h-12 w-12 rounded-full text-white" />
           <article className="flex flex-col space-y-1">
           <p className="text-md font-light text-white">{item.firstname} {' '} {item.lastname}</p>
           <small className="text-xs text-white">{item.username}</small>
           </article>
          </span>
          <p className="text-xl font-light text-white">{item.points}</p>
          </div>
        )
      })}
  </div>;
};
export default MyLeaderboard;
