import { MemberRegistartionFormValues } from "../gym/components/MemberRegistrationForm";
import { MemberDetailWithMetadata } from "../types/Member";
import { StaffDetailWithMetadata, StaffFormValues } from "../types/Staff";
import { UserDetail } from "../types/User";

export const daysOfWeekMap = {
  'Sunday': 'S',
  'Monday': 'M',
  'Tuesday': 'T',
  'Wednesday': 'W',
  'Thursday': 'T',
  'Friday': 'F',
  'Saturday': 'S'
};

export type DayKey = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type MonthKey = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export const weekDaysName: DayKey[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthNames: MonthKey[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const YEARS = Array.from(
  { length: (new Date().getFullYear()) - 2000 + 1 },
  (_, i) => 2000 + i
); 

export const getDayShortName = (day: DayKey): string => {
  return daysOfWeekMap[day];
};

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const contactSeparator = (contact: string) => {
  const contactArray = contact.split('');
  contactArray.splice(3, 0, '-');
  contactArray.splice(7, 0, '-');
  return contactArray.join('');
}

export const fallbackImage = (gender: string) => gender?.toLowerCase() === 'male' ? "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png" : "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg";

export const convertMemberDetailDataToFormData = (memberDetailData: MemberDetailWithMetadata): MemberRegistartionFormValues => {
  const metadata = memberDetailData.metadata;
  return {
    firstName: memberDetailData.firstName,
    lastName: memberDetailData.lastName,
    email: memberDetailData.email,
    contact: memberDetailData.phone,
    gender: memberDetailData.gender,
    dateOfBirth: memberDetailData.dob,
    address: memberDetailData.address,
    city: memberDetailData.city,
    state: memberDetailData.state,
    zip: memberDetailData.zip,
    country: memberDetailData.country,
    membershipType: metadata.membershipDetails.membershipType,
    membershipStatus: memberDetailData.status,
    startDate: metadata.membershipDetails.startDate,
    endDate: metadata.membershipDetails.endDate,
    membershipFee: +metadata.membershipDetails.membershipFee,
    medicalConditions: metadata.medicalDetails.medicalConditions || '',
    emergencyContactName: metadata.medicalDetails.emergencyContactName || '',
    emergencyContactNumber: metadata.medicalDetails.emergencyContactNumber || '',
    allergies: metadata.medicalDetails.allergies || '',
    fitnessGoals: metadata.medicalDetails.fitnessGoals || '',
    height: +(metadata?.fitnessDetails?.height || ''),
    weight: +(metadata?.fitnessDetails?.weight || ''),
    bodyFatPercentage: +(metadata?.fitnessDetails?.bodyFatPercentage || ''),
    fitnessAssessmentNotes: metadata.fitnessDetails.fitnessAssessmentNotes,
    photo: metadata.documentDetails?.userPhoto || '',
    preferredTrainer: metadata.trainingDetails.preferredTrainer,
    preferredTimeSlot: metadata.trainingDetails.preferredTimeSlot,
    specialRequests: metadata.trainingDetails.specialRequests,
  }
}

export const convertStaffDetailDataToFormData = (StaffDetailData: StaffDetailWithMetadata): StaffFormValues => {
  const metadata = StaffDetailData.metadata;
  return {
    firstName: StaffDetailData.firstName,
    lastName: StaffDetailData.lastName,
    email: StaffDetailData.email,
    contactNumber : StaffDetailData.phone,
    gender: StaffDetailData.gender,
    dateOfBirth: StaffDetailData.dob,
    address: StaffDetailData.address,
    medicalConditions: metadata.medicalDetails.medicalConditions || '',
    emergencyContactName: metadata.medicalDetails.emergencyContactName || '',
    emergencyContactNumber: metadata.medicalDetails.emergencyContactNumber || '',
    jobTitle: metadata.employmentDetails.jobTitle || '',
    department: metadata.employmentDetails.department || '',
    dateOfJoining: metadata.employmentDetails.dateOfJoining || '',
    salary: +metadata.employmentDetails.salary || 0,
    employmentType: (metadata.employmentDetails.employmentType as ('Permanent' | 'Contractual')) || 'Permanent',
    supervisorName: metadata.employmentDetails.supervisorName || '',
    certifications: metadata.skillsAndCertifications.certifications || '',
    specializedSkills: metadata.skillsAndCertifications.SpecializedSkills || '',
    yearsOfExperience: metadata.skillsAndCertifications.YearsofExperience || '0',
    bankAccountDetails: metadata.AdditionalField.BankAccountDetails || '',
    joiningBonus: metadata.AdditionalField.JoiningBonus || '',
    endOfContractDate: metadata.AdditionalField.EndofContractDate || '',
  }
}

export const parsedData = (data: UserDetail) => {
  return {
    ...data,
    metadata: JSON.parse(data.metadata || '{}')
  }
} 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformObject(flatObject: { [x: string]: any; }) {
  const result = {};

  Object.keys(flatObject).forEach(key => {
      if (key.includes('.')) {
          const keys = key.split('.');
          let temp = result;

          keys.forEach((k, index) => {
              if (index === keys.length - 1) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
                  temp[k] = flatObject[key]; // Assign value at the last key
              } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
                  temp[k] = temp[k] || {}; // Create object if it doesn't exist
              }
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
              temp = temp[k]; // Move deeper
          });
      } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result[key] = flatObject[key]; // Direct key-value assignments
      }
  });

  return result;
}

export const formatToIndianCurrency = (amount: number): string => {
  // Handle negative numbers
  const isNegative = amount < 0;
  const absoluteValue = Math.abs(amount);
  
  // Convert to string and split into integer and decimal parts
  const [integerPart, decimalPart] = absoluteValue.toString().split('.');
  
  // Format integer part with commas
  const lastThree = integerPart.slice(-3);
  const remainingDigits = integerPart.slice(0, -3);
  const formattedRemainingDigits = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  // Combine parts
  let result = '';
  
  if (formattedRemainingDigits) {
    result = formattedRemainingDigits + ',' + lastThree;
  } else {
    result = lastThree;
  }
  
  // Add decimal part if exists
  if (decimalPart) {
    result += '.' + decimalPart;
  }
  
  // Add negative sign if needed
  return isNegative ? '-' + result : result;
}

export function calculateMonthlyEMI({
  principal,
  interestRate,
  numberOfMonths
}: {
  principal: number;
  interestRate: number;
  numberOfMonths: number;
}) {
  // Convert annual interest rate to a monthly decimal rate.
  const monthlyInterestRate = (interestRate / 100) / 12;
  
  // Calculate EMI using the formula:
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
  const emi = numerator / denominator;

  return emi;
}

/**
 * Generates an amortization schedule for the given inputs.
 * @param {Object} params
 * @param {number} params.assetPurchasePrice - The total purchase price of the asset
 * @param {number} params.downpayment - The initial downpayment
 * @param {number} params.interestRate - The annual interest rate in percent (e.g., 8 for 8%)
 * @param {number} params.tenure - The tenure in years
 * @returns {Array[]} - Returns a 2D array of rows:
 *                     [monthIndex, EMI, interestPortion, principalPortion, outstandingPrincipal]
 */
export function generateAmortizationSchedule({
  assetPurchasePrice,
  downpayment,
  interestRate,
  tenure
}: {
  assetPurchasePrice: number;
  downpayment: number;
  interestRate: number;
  tenure: number;
}) {
  // Calculate the principal amount after downpayment.
  const principal = assetPurchasePrice - downpayment;
  
  // Convert annual interest rate to a monthly decimal rate.
  const monthlyInterestRate = (interestRate / 100) / 12;
  
  // Total number of monthly installments (tenure is in years).
  const numberOfMonths = tenure * 12;
  
  // Calculate EMI using the formula:
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
  const emi = numerator / denominator;
  
  // Calculate the total interest payable over the full tenure.
  const totalInterest = emi * numberOfMonths - principal;
  let cumulativeInterest = 0;
  let outstandingPrincipal = principal;
  const schedule = [];
  
  for (let month = 1; month <= numberOfMonths; month++) {
    // Interest portion for this month.
    const interestForMonth = outstandingPrincipal * monthlyInterestRate;
    // Principal portion for this month.
    const principalForMonth = emi - interestForMonth;
    // Update outstanding principal.
    const newOutstandingPrincipal = outstandingPrincipal - principalForMonth;
    
    // Update cumulative interest paid so far.
    cumulativeInterest += interestForMonth;
    // Calculate the remaining interest to be paid.
    const outstandingInterest = totalInterest - cumulativeInterest;
    
    // Add the row to the schedule array.
    schedule.push([
      month,
      (parseInt(emi.toFixed(2))),
      (parseInt(interestForMonth.toFixed(2))),
      (parseInt(principalForMonth.toFixed(2))),
      (parseInt((newOutstandingPrincipal > 0 ? newOutstandingPrincipal.toFixed(2) : 0).toString())),
      (parseInt((outstandingInterest > 0 ? outstandingInterest.toFixed(2) : 0).toString()))
    ]);
    
    // Prepare for the next iteration.
    outstandingPrincipal = newOutstandingPrincipal;
  }
  
  return schedule;
}
