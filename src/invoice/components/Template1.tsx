export default function Template1() {
  return (
    <div className="receipt bg-white py-10 px-6 rounded-md">
      <h1 className="text-2xl font-bold">Receipt</h1>
      <div className="top-section flex justify-between">
        <div>
          <img width={80} src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-gym-logo-png-image_5149987.jpg" alt="" />
          <p className="mt-2 font-bold">Fitness gym</p>
        </div>
        <div className="max-w-xl flex flex-col place-content-end place-items-end text-right text-sm font-semibold">
          <p className="address-first-line">SURVAY NO.13/1,2nd Floor, Thirumenahalli, Near Haj Bhavan, HP Petrol Pump, Hegde Nagar Main Road, Bengaluru, Karnataka - 560064</p>
          <p>GSTIN No : 29AAHCE6539N1ZW</p>
          <p>Date: 14/05/2024</p>
          <p>Sales rep: Manish</p>
        </div>
      </div>
      <div className="description mt-4 font-semibold">
        <p>Amount Received From Kumar of ₹ 10,000.00 For Gym Workout - Service Fee for Gym Workout -
        12 Months</p>
      </div>
      <div className="transaction-table mt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <tbody>
              <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  Total Amount Due
                </th>
                <td className="px-6 py-4 text-right">
                  ₹ 10,000.00
                </td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  Amount Received
                </th>
                <td className="px-6 py-4 text-right">
                  10000
                </td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  Balance Due
                </th>
                <td className="px-6 py-4 text-right">
                  ₹ 0.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="text-right mt-4 text-sm">Payment received in : UPI</p>
      </div>
      <div className="grid place-items-center text-sm font-semibold">
        <p>If you have any questions about this bill, please contact</p>
        <p>Mail : exposefitnesspvtltd@gmail.com, Phone : 6361839808 / 9704317880</p>
      </div>
    </div>
  )
}
