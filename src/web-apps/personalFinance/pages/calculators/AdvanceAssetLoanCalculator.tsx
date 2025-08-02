import { useEffect, useState } from "react";
import PageHeading from "../../../../components/PageHeading";
import FormComponent from "../../../../shared/components/Form/FormComponent";
import Table from "../../components/Table";
import { formatToIndianCurrency } from "../../../../helpers";
import { Line } from "react-chartjs-2";
import EditColumn from "../../components/EditColumn";

export default function AdvanceAssetLoanCalculator() {
  const [data, setData] = useState<number[][]>([]);
  const [formValues, setFormValues] = useState<{
    assetPurchasePrice: number;
    downpayment: number;
    interestRate: number;
    tenure: number;
    hasEvenPrepayment: string;
    keepEMISame: string;
    prepaymentAmount: number;
    interestRateChange: Record<number, number>;
    unevenPrepayments: Record<number, number>;
  }>({
    assetPurchasePrice: 0,
    downpayment: 0,
    interestRate: 0,
    tenure: 0,
    hasEvenPrepayment: "Yes",
    keepEMISame: "Yes",
    prepaymentAmount: 0,
    interestRateChange: {},
    unevenPrepayments: {},
  });

  function calculateScheduleData({
    assetPurchasePrice,
    downpayment,
    interestRate,
    tenure,
    hasEvenPrepayment, // "Yes" or "No"
    keepEMISame, // "Yes" or "No"
    prepaymentAmount,
    interestRateChange,
    unevenPrepayments,
  }: {
    assetPurchasePrice: number;
    downpayment: number;
    interestRate: number;
    tenure: number;
    hasEvenPrepayment: string;
    keepEMISame: string;
    prepaymentAmount: number;
    interestRateChange: Record<number, number>;
    unevenPrepayments: Record<number, number>;
  }) {
    if (data.length > 0) {
      setData([]);
    }
    if (!assetPurchasePrice) {
      setData([]);
      return;
    }

    const tmp = [];

    const principal = assetPurchasePrice - downpayment;
    let currentPrincipal = principal;
    let totalInterestPaid = 0; // Initialize total interest paid
    let remainingMonths = tenure * 12;
    let fixedMonthlyEMI = calculateMonthlyEMI({
      principal: currentPrincipal,
      interestRate: interestRate,
      numberOfMonths: remainingMonths,
    });

    for (let i = 0; currentPrincipal > 0; i++) {
      // take interest rate from previous month
      let updatedInterestRate = interestRate;
      if (i) {
        updatedInterestRate = interestRateChange[i+1] || tmp[i-1][6];
      }
      // Apply prepayment annually at the start of each year
      if (hasEvenPrepayment === "Yes" && i % 12 === 0 && i !== 0) {
        currentPrincipal -= prepaymentAmount;

        // Recalculate the remaining months or EMI based on the flag
        if (keepEMISame === "Yes") {
          remainingMonths = calculateRemainingMonths(currentPrincipal, fixedMonthlyEMI, updatedInterestRate);
        } else {
          fixedMonthlyEMI = calculateMonthlyEMI({
            principal: currentPrincipal,
            interestRate: updatedInterestRate,
            numberOfMonths: remainingMonths - i,
          });
        }
      }

      // Uneven prepayment
      if (unevenPrepayments[i+1]) {
        currentPrincipal -= unevenPrepayments[i+1];
        if (keepEMISame === "Yes") {
          remainingMonths = calculateRemainingMonths(currentPrincipal, fixedMonthlyEMI, updatedInterestRate);
        } else {
          fixedMonthlyEMI = calculateMonthlyEMI({
            principal: currentPrincipal,
            interestRate: updatedInterestRate,
            numberOfMonths: remainingMonths - i,
          });
        }
      }

      if (currentPrincipal <= 0) {
        console.log("Loan paid off early at month " + i);
        break; // Exit the loop if the loan is fully paid
      }

      const monthlyInterest = (currentPrincipal * updatedInterestRate) / 1200;
      totalInterestPaid += monthlyInterest; // Update total interest paid
      const principalPaid = fixedMonthlyEMI - monthlyInterest;
      currentPrincipal -= principalPaid; // Update principal

      tmp.push([i + 1, fixedMonthlyEMI, monthlyInterest, principalPaid, currentPrincipal, totalInterestPaid, updatedInterestRate]);
    }

    setData(tmp)
  }

  function calculateMonthlyEMI({ principal, interestRate, numberOfMonths }: {
    principal: number;
    interestRate: number;
    numberOfMonths: number;
  }) {
    if (numberOfMonths === 0) {
      return 0; // Avoid division by zero in edge cases
    }
    const monthlyRate = interestRate / 1200;
    return principal * monthlyRate / (1 - (1 + monthlyRate) ** (-numberOfMonths));
  }

  function calculateRemainingMonths(principal: number, emi: number, interestRate: number) {
    const monthlyRate = interestRate / 1200;
    let months = 0;
    let balance = principal;
    while (balance > 0) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      months++;
      if (principalPaid <= 0) {
          break; // Prevent infinite loop in case EMI is less than the interest
      }
    }
    return months;
  }

  const onFormSubmit = (formValues: {
    assetPurchasePrice: string;
    downpayment: string;
    interestRate: string;
    tenure: string;
    hasEvenPrepayment: string;
    keepEMISame: string;
    prepaymentAmount: string;
  }) => {
    setFormValues({
      assetPurchasePrice: parseFloat(formValues.assetPurchasePrice),
      downpayment: parseFloat(formValues.downpayment),
      interestRate: parseFloat(formValues.interestRate),
      tenure: parseFloat(formValues.tenure),
      hasEvenPrepayment: formValues.hasEvenPrepayment,
      keepEMISame: formValues.keepEMISame,
      prepaymentAmount: parseFloat(formValues.prepaymentAmount),
      interestRateChange: {},
      unevenPrepayments: {},
    })
  }

  useEffect(() => {
    calculateScheduleData({
      ...formValues
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues])

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Advance asset loan calculator"
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
              {
                label: 'Has even prepayment?',
                name: 'hasEvenPrepayment',
                type: 'select',
                initValue: 'No',
                options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }],
                required: false
              },
              {
                label: 'Keep EMI same after prepayment?',
                name: 'keepEMISame',
                type: 'select',
                initValue: 'No',
                options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }],
                required: false
              },
              {
                label: 'Prepayment amount',
                name: 'prepaymentAmount',
                type: 'number',
                initValue: 0,
                placeholder: '0.00',
                required: false
              }
            ]}
            onFormSubmit={onFormSubmit}
          />
        </div>
        <div className="grow flex justify-end">
          <Line
            data={{
              labels: data.map((row) => row[0]),
              datasets: [
                {
                  label: 'EMI',
                  data: data.map((row) => row[1]),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
                {
                  label: 'Interest',
                  data: data.map((row) => row[2]),
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1
                },
                {
                  label: 'Principal',
                  data: data.map((row) => row[3]),
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

      {!!data.length && <div>
        <Table
          headers={['Monthly EMI', 'Total interest amount', 'Total money given by you througout', 'Tenure']}
          rows={[
            [
              formatToIndianCurrency(Math.round(data[0][1])),
              formatToIndianCurrency(Math.round(data[data.length-1][5])),
              formatToIndianCurrency(Math.round(data[data.length-1][5]+data[0][4]+data[0][3])),
              <span className="bg-green-200 p-1 rounded-sm text-gray-800">{`${formatToIndianCurrency(Math.round(data.length/12))} years`}</span>,
            ]
          ]}
        />
      </div>}

      {!!data.length && <Table
        headers={['Months', 'EMI', 'Towards interest', 'Towards principal', 'Outstanding principal amount', 'Outstanding interest amount', 'Interest rate', 'Uneven prepayment']}
        rows={data.map((row) => [
          row[0],
          formatToIndianCurrency(Math.round(row[1])),
          formatToIndianCurrency(Math.round(row[2])),
          formatToIndianCurrency(Math.round(row[3])),
          formatToIndianCurrency(Math.round(row[4])),
          formatToIndianCurrency(Math.round(row[5])),
          <span>
            <EditColumn
              value={formValues.interestRateChange[row[0]] || row[6]}
              isEditable={row[0] !== 1}
              onChange={(val) => {
                const tmp = {...formValues.interestRateChange};
                if (!tmp[row[0]]) {
                  tmp[row[0]] = parseFloat(val.toString());
                }
                else tmp[row[0]] = parseFloat(val.toString());
                setFormValues({
                  ...formValues,
                  interestRateChange: tmp
                });
              }}
            />
          </span>,
          <span>
            <EditColumn
              value={formValues.unevenPrepayments[row[0]] || 0}
              isEditable={row[0] !== 1}
              onChange={(val) => {
                const tmp = {...formValues.unevenPrepayments};
                if (!tmp[row[0]]) {
                  tmp[row[0]] = parseFloat(val.toString());
                }
                else tmp[row[0]] = parseFloat(val.toString());
                setFormValues({
                  ...formValues,
                  unevenPrepayments: tmp
                });
              }}
            />
          </span>
        ])}
      />}
    </div>
  )
}
