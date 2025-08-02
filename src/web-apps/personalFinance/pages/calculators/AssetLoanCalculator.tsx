import { useMemo, useState } from "react";
import PageHeading from "../../../../components/PageHeading";
import FormComponent from "../../../../shared/components/Form/FormComponent";
import Table from "../../components/Table";
import { calculateMonthlyEMI, formatToIndianCurrency, generateAmortizationSchedule } from "../../../../helpers";
import { Line } from "react-chartjs-2";

export default function AssetLoanCalculator() {
  const [assetPurchasePrice, setAssetPurchasePrice] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);

  const scheduleData = useMemo(() => generateAmortizationSchedule({
    assetPurchasePrice,
    downpayment,
    interestRate,
    tenure
  }), [
    assetPurchasePrice,
    downpayment,
    interestRate,
    tenure
  ])

  const onFormSubmit = (formValues: {
    assetPurchasePrice: string;
    downpayment: string;
    interestRate: string;
    tenure: string;
  }) => {
    setAssetPurchasePrice(parseFloat(formValues.assetPurchasePrice));
    setDownpayment(parseFloat(formValues.downpayment));
    setInterestRate(parseFloat(formValues.interestRate));
    setTenure(parseFloat(formValues.tenure));
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Asset loan calculator"
        description="Calculate your asset loan and manange how you can reduce EMIs or tenure"
      />
      
      <div className="w-full flex justify-between flex-wrap gap-4">
        <div className="w-sm">
          <FormComponent
            schema={[
              {
                label: 'Asset purchase price',
                name: 'assetPurchasePrice',
                type: 'number',
                initValue: 5000000,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Downpayment',
                name: 'downpayment',
                type: 'number',
                initValue: 1000000,
                placeholder: '0.00',
                required: true
              },
              {
                label: 'Interest rate %',
                name: 'interestRate',
                type: 'number',
                initValue: 8.75,
                placeholder: '0',
                required: true
              },
              {
                label: 'Tenure(in years)',
                name: 'tenure',
                type: 'number',
                initValue: 20,
                placeholder: '0.00',
                required: true
              },
            ]}
            onFormSubmit={onFormSubmit}
          />
        </div>
        <div className="grow flex justify-end">
          <Line
            data={{
              labels: scheduleData.map((row) => row[0]),
              datasets: [
                {
                  label: 'EMI',
                  data: scheduleData.map((row) => row[1]),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
                {
                  label: 'Interest',
                  data: scheduleData.map((row) => row[2]),
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1
                },
                {
                  label: 'Principal',
                  data: scheduleData.map((row) => row[3]),
                  fill: true,
                  backgroundColor: 'rgba(53, 162, 235, 0.2)',
                  borderColor: 'rgb(53, 162, 235)',
                  tension: 0.1
                }
              ]
            }}
          />
        </div>
      </div>

      <div>
        <Table
          headers={['Monthly EMI', 'Total interest amount', 'Total money given by you througout', 'Tenure']}
          rows={[
            [
              formatToIndianCurrency(Math.round(calculateMonthlyEMI({
                principal: assetPurchasePrice-downpayment,
                interestRate,
                numberOfMonths: tenure*12,
              }))),
              formatToIndianCurrency(Math.round(calculateMonthlyEMI({
                principal: assetPurchasePrice-downpayment,
                interestRate,
                numberOfMonths: tenure*12,
              }) * tenure * 12 - (assetPurchasePrice - downpayment))),
              formatToIndianCurrency(Math.round(calculateMonthlyEMI({
                principal: assetPurchasePrice-downpayment,
                interestRate,
                numberOfMonths: tenure*12,
              }) * tenure * 12)),
              `${tenure} years`
            ]
          ]}
        />
      </div>

      <Table
        headers={['Months', 'EMI', 'Towards interest', 'Towards principal', 'Outstanding principal amount', 'Outstanding interest amount']}
        rows={scheduleData}
      />
    </div>
  )
}
