import { useState } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import PageHeading from '../../../../components/PageHeading'
import FormComponent from '../../../../shared/components/Form/FormComponent'
import { formatToIndianCurrency } from '../../../../helpers';

const getFIREData = (assetValue: number, monthlyExpense: number) => {
  return [
    {
      label: 'You have',
      xlabel: 'You',
      yvalue: assetValue,
      value: formatToIndianCurrency(assetValue)
    },
    {
      label: 'Lean FIRE Number',
      xlabel: 'Lean FIRE',
      yvalue: Math.round(monthlyExpense*12)*15,
      value: formatToIndianCurrency(Math.round(monthlyExpense*12)*15)
    },
    {
      label: 'FIRE Number',
      xlabel: 'FIRE',
      yvalue: Math.round(monthlyExpense*12)*25,
      value: formatToIndianCurrency(Math.round(monthlyExpense*12)*25)
    },
    {
      label: 'Fat FIRE Number',
      xlabel: 'Fat FIRE',
      yvalue: Math.round(monthlyExpense*12)*50,
      value: formatToIndianCurrency(Math.round(monthlyExpense*12)*50)
    }
  ];
}

export default function FIRECalculator() {
  const [assetValue, setAssetValue] = useState(-1);
  const [monthlyExpense, setMonthlyExpense] = useState(-1);

  const onFormSubmit = (formValues: { assetValue: number, monthlyExpense: number }) => {
    setAssetValue(+formValues.assetValue);
    setMonthlyExpense(+formValues.monthlyExpense);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="FIRE calculator"
        description="Financial Independence Retire Early"
      />
      <div className="w-sm">
        <FormComponent
          schema={[
            {
              label: 'Total asset value',
              name: 'assetValue',
              type: 'number',
              initValue: 5000000,
              placeholder: '0.00',
              required: true
            },
            {
              label: 'Monthly expense',
              name: 'monthlyExpense',
              type: 'number',
              initValue: 50000,
              placeholder: '0.00',
              required: true
            },
          ]}
          onFormSubmit={onFormSubmit}
        />
      </div>

      {assetValue > 0 && monthlyExpense > 0 && <p className='text-gray-600'>You have <span className='text-gray-50 bg-sky-600 rounded-sm px-1 py-0.5'>{(assetValue/(monthlyExpense*12)).toFixed(2)}</span> years of saving</p>}

      {assetValue > 0 && monthlyExpense > 0 && <div className='w-sm flex flex-wrap justify-between gap-4'>
        {getFIREData(assetValue, monthlyExpense).map((data, index) => <div key={index}>
          <p className='text-sm text-gray-600'>{data.label}</p>
          <h3 className='text-xl text-gray-700'>Rs. {data.value}</h3>
        </div>)}
      </div>}

      <div className="w-sm">
        {assetValue > 0 && monthlyExpense > 0 && <Bar
          data={{
            labels: getFIREData(assetValue, monthlyExpense).sort((a, b) => a.yvalue - b.yvalue).map(v => v.xlabel),
            datasets: [
              {
                label: 'Value',
                data: getFIREData(assetValue, monthlyExpense).sort((a, b) => a.yvalue - b.yvalue).map(v => v.yvalue),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                ],
                borderWidth: 1
              }
            ]
          }}
        />}
      </div>
    </div>
  )
}
