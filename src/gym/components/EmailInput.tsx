export default function EmailInput() {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden w-96">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 text-gray-700 focus:outline-hidden"
      />
      <button className="bg-[#65827e] text-white px-6 py-2 font-bold hover:bg-[#0b2824]">
        GET STARTED
      </button>
    </div>
  );
}
