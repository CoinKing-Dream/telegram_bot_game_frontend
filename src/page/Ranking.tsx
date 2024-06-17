import RankingList from "../component/RankingList";

export default function Ranking() {
  return (
    <div className="Ranking max-w-full mx-auto text-white h-[75vh] max-sm:h-[85vh] max-sm:mt-2 mt-10">
      <h1 className="text-3xl text-bold max-sm:text-2xl mb-3 max-sm:mb-1 max-w-[500px] mx-auto text-start text-white flex justify-center">Ranking</h1>
      <RankingList />
    </div>
  )
}
