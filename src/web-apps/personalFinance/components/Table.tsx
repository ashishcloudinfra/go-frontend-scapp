interface ITableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
}

export default function Table(props: ITableProps) {
  return (    
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {props.headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => (
            <tr key={index} className="bg-white border-b border-gray-200">
              {row.map((cell, index) => (
                <td key={index} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
