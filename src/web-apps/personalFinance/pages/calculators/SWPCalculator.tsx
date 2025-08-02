import 'chart.js/auto';
import PageHeading from '../../../../components/PageHeading'
import FormComponent from '../../../../shared/components/Form/FormComponent'
import { formatToIndianCurrency } from '../../../../helpers';
import { useState } from 'react';
import Table from '../../components/Table';
import { Line } from 'react-chartjs-2';

export default function SWPCalculator() {
  const [data, setData] = useState<{
    year: number,
    amount: number,
    increasedAmount: number,
    withdrawalAmountPerYear: number,
    withdrawalAmountPerMonth: number,
    remainingAmount: number,
  }[]>([]);

  const onFormSubmit = (formValues: { currentValue: number, withdrawalPct: number, increasePct: number }) => {
    const { currentValue, withdrawalPct, increasePct } = formValues;
    const amount = currentValue;
    const increasedAmount = 0;
    const remainingAmount = currentValue;
    const newData = [];
    newData.push({
      year: 0,
      amount,
      increasedAmount,
      withdrawalAmountPerYear: 0,
      withdrawalAmountPerMonth: 0,
      remainingAmount,
    });
    for (let i = 1; i < 41; i++) {
      const newIncreasedAmount: number = newData[i-1].remainingAmount*(1+(increasePct*0.01));
      const withdrawalThisYear = newIncreasedAmount*(withdrawalPct*0.01);
      newData.push({
        year: i,
        amount: newIncreasedAmount,
        increasedAmount: newIncreasedAmount - newData[i-1].amount,
        withdrawalAmountPerYear: withdrawalThisYear,
        withdrawalAmountPerMonth: withdrawalThisYear/12,
        remainingAmount: newIncreasedAmount - withdrawalThisYear,
      });
    }
    setData(newData);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="SWP calculator"
        description="Financial Independence Retire Early"
      />
      <div className="w-full flex justify-between flex-wrap gap-4">
        <div className='w-sm'>
          <FormComponent
            schema={[
              {
                label: 'Current amount you have',
                name: 'currentValue',
                type: 'number',
                initValue: 5000000,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Withdrawal percentage',
                name: 'withdrawalPct',
                type: 'number',
                initValue: 4,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Returns increase percentage',
                name: 'increasePct',
                type: 'number',
                initValue: 10,
                placeholder: '0.00',
                required: true
              },
            ]}
            onFormSubmit={onFormSubmit}
          />
        </div>
        {!!data.length && <div className="grow flex justify-end">
          <Line
            data={{
              labels: data.map((v) => v.year),
              datasets: [
                {
                  label: 'Per year withdrawal',
                  data: data.map((v) => v.withdrawalAmountPerYear),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
                {
                  label: 'Remaining amount',
                  data:  data.map((v) => v.remainingAmount),
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1
                },
              ]
            }}
          />
        </div>}
      </div>

      {!!data.length && <div>
        <p>You are increasing your withdrawal money by <span className='text-gray-50 bg-green-600 px-1 rounded-sm'>{Math.fround((data[2].withdrawalAmountPerMonth-data[1].withdrawalAmountPerMonth)/data[1].withdrawalAmountPerMonth*100).toFixed(2)}%</span></p>
      </div>}

      <div>
        {!!data.length && <Table
          headers={['Year', 'Amount', 'Increased amount', 'Withdrawal Amount Per Year', 'Withdrawal Amount Per Month', 'Remaining amount']}
          rows={data.map(v => ([
            v.year,
            formatToIndianCurrency(Math.round(v.amount)),
            formatToIndianCurrency(Math.round(v.increasedAmount)),
            formatToIndianCurrency(Math.round(v.withdrawalAmountPerYear)),
            formatToIndianCurrency(Math.round(v.withdrawalAmountPerMonth)),
            formatToIndianCurrency(Math.round(v.remainingAmount))
          ]))}
        />}
      </div>
    </div>
  )
}
