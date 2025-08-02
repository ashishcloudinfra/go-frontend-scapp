import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { countriesList } from "../../utils/countriesList";

export interface MemberRegistartionFormValues {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  membershipType: string;
  membershipStatus?: "authorized" | "review" | "deactivated";
  startDate: string;
  endDate: string;
  membershipFee: number;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  allergies: string;
  fitnessGoals: string;
  height?: number;
  weight?: number;
  bodyFatPercentage?: number;
  fitnessAssessmentNotes?: string;
  photo?: FileList | string;
  preferredTrainer?: string;
  preferredTimeSlot?: string;
  specialRequests?: string;
};

const countries = countriesList.map(country => country.name.common).sort();

interface IMemberManagementFormProps {
  formValues?: MemberRegistartionFormValues;
  membershipPlansValueMap: {
    id: string;
    name: string;
    price: number;
    duration: string;
  }[];
  onSubmitHandler: (values: MemberRegistartionFormValues) => void;
}

const MemberRegistrationForm = (props: IMemberManagementFormProps) => {
  const [isAdditionalDetailsOpen, setIsAdditionalDetailsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MemberRegistartionFormValues>({
    defaultValues: useMemo(() => props.formValues, [props.formValues]),
  });

  const membershipTypeValue = watch("membershipType");

  useEffect(() => {
    if (props.membershipPlansValueMap.length) {
      setValue('membershipFee', props.membershipPlansValueMap.find(v => v.id === membershipTypeValue)?.price || 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipTypeValue, props.membershipPlansValueMap]);

  const toggleAdditionalDetails = () => {
    setIsAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  };

  const onSubmit: SubmitHandler<MemberRegistartionFormValues> = (data) => {
    props.onSubmitHandler(data);
  };

  return (
    <div className="">
      <form
        className="max-w-4xl  p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Personal Details */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="tel"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="date"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
              />
              {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="preferNotToSay">Prefer Not to Say</option>
              </select>
              {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <span className="text-red-500">{errors.address.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <span className="text-red-500">{errors.city.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && <span className="text-red-500">{errors.state.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ZIP code</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                {...register("zip", { required: "ZIP code is required" })}
              />
              {errors.zip && <span className="text-red-500">{errors.zip.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("country", { required: "Country is required" })}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </div>
          </div>
        </section>

        <hr className="my-8 border-gray-400" />

        {/* Membership Details */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Membership Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Membership Type</label>
              <select
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("membershipType", { required: "Membership type is required" })}
              >
                <option value="">Select Membership Type</option>
                {props.membershipPlansValueMap.map(key => <option key={key.id} value={key.id}>{key.name} - {key.duration}</option>)}
              </select>
              {errors.membershipType && (
                <span className="text-red-500">{errors.membershipType.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="date"
                {...register("startDate", { required: "Start date is required" })}
              />
              {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="date"
                {...register("endDate")}
              />
              {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Membership Fee</label>
              <input
                className="bg-gray-200 cursor-not-allowed border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                placeholder="Membership Fee"
                disabled={true}
                {...register("membershipFee")}
              />
              {errors.membershipFee && (
                <span className="text-red-500">{errors.membershipFee.message}</span>
              )}
            </div>
          </div>
        </section>

        <hr className="my-8 border-gray-400" />

        {/* Additional Details */}
        <section className="mb-6">
          <button
            type="button"
            className="w-full bg-gray-500 text-gray-100 py-2 px-4 rounded-md text-left flex justify-between items-center"
            onClick={toggleAdditionalDetails}
          >
            <span>Additional Details</span>
            <span>{isAdditionalDetailsOpen ? "▼" : "▶"}</span>
          </button>
          {isAdditionalDetailsOpen && (
            <div className="mt-4 space-y-4">
              {/* Fitness Details */}
              <div>
                <h3 className="text-xl mt-8 mb-2 font-semibold">Fitness Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (cm/inches)</label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="number"
                      placeholder="Height"
                      {...register("height")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg/pounds)</label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="number"
                      placeholder="Weight"
                      {...register("weight")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Body Fat Percentage</label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="number"
                      placeholder="Body Fat Percentage"
                      {...register("bodyFatPercentage")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Fitness Assessment Notes</label>
                    <textarea
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Fitness Assessment Notes"
                      {...register("fitnessAssessmentNotes")}
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="border-gray-400" />

              {/* Optional Details */}
              <div>
                <h3 className="text-xl font-semibold">Optional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Picture</label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="file"
                      {...register("photo")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Trainer</label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      placeholder="Preferred Trainer"
                      {...register("preferredTrainer")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred Time Slot (e.g., Morning, Evening)
                    </label>
                    <input
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      placeholder="Preferred Time Slot"
                      {...register("preferredTimeSlot")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Special Requests</label>
                    <textarea
                      className="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Special Requests"
                      {...register("specialRequests")}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <button className="w-full xs:col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 p-2 bg-primary text-gray-300 rounded-sm hover:bg-gray-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MemberRegistrationForm;
