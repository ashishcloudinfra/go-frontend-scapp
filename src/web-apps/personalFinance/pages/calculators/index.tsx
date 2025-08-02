import PageHeading from "../../../../components/PageHeading";
import CalculatorTile from "../../components/Calculators/CalculatorTile";
import { useNavigate } from "react-router";

const calculatorsData = [
  {
    title: "Asset loan calculator",
    description: "Calculate your asset loan and manange how you can reduce EMIs or tenure",
    link: "/personalfinance/calculators/asset-loan-calculator",
  },
  {
    title: "FIRE calculator",
    description: "Financial Independence Retire Early",
    link: "/personalfinance/calculators/fire-calculator",
  },
  {
    title: "Advance asset loan calculator",
    description: "Calculate your asset loan and manange how you can reduce EMIs or tenure",
    link: "/personalfinance/calculators/advance-asset-loan-calculator",
  },
  {
    title: "SWP calculator",
    description: "Calculate your how much you can withdraw from your investments",
    link: "/personalfinance/calculators/swp-calculator",
  },
  {
    title: "SIP calculator",
    description: "Easily calculate your SIP returns and track your investment growth in seconds",
    link: "/personalfinance/calculators/sip-calculator",
  },
]

export default function CalculatorsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Calculators"
        description="All your financial calculators at one place"
      />
      <div className="flex flex-wrap gap-6">
        {calculatorsData.map((calculator, index) => (
          <CalculatorTile
            key={index}
            title={calculator.title}
            description={calculator.description}
            onClick={() => navigate(calculator.link)}
          />
        ))}
      </div>
    </div>
  )
}
