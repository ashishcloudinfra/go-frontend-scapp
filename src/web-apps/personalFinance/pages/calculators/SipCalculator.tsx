import 'chart.js/auto';
import PageHeading from '../../../../components/PageHeading'
import { formatToIndianCurrency } from '../../../../helpers';
import { useState } from 'react';
import Table from '../../components/Table';
import { Line } from 'react-chartjs-2';
import FormComponent from '../../../../shared/components/Form/FormComponent';

export default function SipCalculator() {
  const [data, setData] = useState<{
    month: number,
    monthlySipAmount: number,
    investedByYou: number,
    currentValue: number,
    inflationAdjustedValue: number,
  }[]>([]);

  const onFormSubmit = (formValues: { initialInvestment: number, amountPerMonth: number, interestRatePct: number, tenure: number, stepUpPct: number, inflationPct: number }) => {
    const { initialInvestment, amountPerMonth, interestRatePct, tenure, inflationPct } = formValues;
    const newData = [];
    newData.push({
        month: 0,
        monthlySipAmount: amountPerMonth,
        investedByYou: initialInvestment,
        currentValue: initialInvestment,
        inflationAdjustedValue: initialInvestment,
      });
    for (let i=1; i<(tenure*12); i++) {
        newData.push({
            month: i,
            monthlySipAmount: amountPerMonth,
            investedByYou: newData[i-1].investedByYou + amountPerMonth,
            currentValue: (amountPerMonth + newData[i-1].currentValue) * (1 + (interestRatePct / 1200)),
            inflationAdjustedValue: (amountPerMonth + newData[i-1].inflationAdjustedValue) * (1 + (inflationPct / 1200)),
          });
    }
    setData(newData);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Sip calculator"
        description="Calculate your SIP returns and track your investment growth in seconds"
      />
      <div className="w-full flex justify-between flex-wrap gap-4">
        <div className='w-sm'>
          <FormComponent
            schema={[
              {
                label: 'Initial investment',
                name: 'initialInvestment',
                type: 'number',
                initValue: 6100000,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Amount per month',
                name: 'amountPerMonth',
                type: 'number',
                initValue: 50000,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Interest rate',
                name: 'interestRatePct',
                type: 'number',
                initValue: 12,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Tenure',
                name: 'tenure',
                type: 'number',
                initValue: 15,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Step-up %',
                name: 'stepUpPct',
                type: 'number',
                initValue: 0,
                placeholder: '0.00',
                required: false
              },
              {
                label: 'Inflation',
                name: 'inflationPct',
                type: 'number',
                initValue: 7,
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
              labels: data.map((v) => v.month),
              datasets: [
                {
                  label: 'Current Value',
                  data: data.map((v) => v.currentValue),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
              ]
            }}
          />
        </div>}
      </div>

      <div>
        {!!data.length && <Table
          headers={['month', 'monthlySipAmount', 'investedByYou', 'currentValue', 'inflationAdjustedValue']}
          rows={data.map(v => ([
            v.month,
            formatToIndianCurrency(Math.round(v.monthlySipAmount)),
            formatToIndianCurrency(Math.round(v.investedByYou)),
            formatToIndianCurrency(Math.round(v.currentValue)),
            formatToIndianCurrency(Math.round(v.inflationAdjustedValue))
          ]))}
        />}
      </div>
    </div>
  )
}
