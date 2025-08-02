import EmailInput from "./EmailInput";

export default function Intro() {
  return (
    <div className="flex bg-linear-to-r from-[#14423c] to-[#3d7069] p-4 lg:p-16">
      <div>
        <p className="text-stone-300 mt-8 mb-4 text-lg lg:text-2xl font-bold">GYM MANAGEMENT MADE SIMPLE</p>
        <h2 className="text-5xl lg:text-7xl font-bold text-yellow-100">Make your life easier with Simplify Control</h2>
        <p className="text-stone-300 mt-8 mb-8 text-md lg:text-xl">The only all-in-one gym management software with integrated 24/7 Bluetooth door access—no third-party add-ons required! Experience admin autopilot at a fraction of the cost, making it better for you, your members, and your budget.</p>
        <EmailInput />
      </div>
      <img src="/images/couplegym.png" className="hidden lg:block" />
    </div>
  )
}
