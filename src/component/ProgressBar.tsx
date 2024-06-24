export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[60vw] max-md:w-[60vw] max-sm:w-[80vw] h-[2vh]  border-[#E39431] bg-[#2F2F2F] border-[1px] rounded-full flex items-center "
      >
        <div
          className="bg-[#E39431] h-[1.5vh] rounded-full mx-1"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
