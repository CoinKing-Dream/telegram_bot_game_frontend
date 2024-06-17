export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[25vw] max-sm:w-64 h-4 max-md:h-3 max-sm:h-2 max-sm:h-1 border-[#E39431] bg-[#2F2F2F] border-[1px] rounded-full flex items-center"
      >
        <div
          className="bg-[#E39431] h-3 max-md:h-2 max-sm:h-1 rounded-full mx-1"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
