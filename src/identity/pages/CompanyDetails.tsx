import React, { useState } from "react";
import { useNavigate } from "react-router";
import { countriesList } from "../../utils/countriesList";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../../app/hooks";
import { postCompanyDetails } from "../../app/actions/identity/auth";
import useNavigateWithQueryParams from "../../hooks/useNavigateWithQueryParams";

export interface CompanyFormValues {
  name: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  country: string;
  type: string;
  isDefault: boolean;
  pincode: string;
}

const countries = countriesList.map(country => country.name.common).sort();

export default function CompanyDetails() {
  const dispatch = useAppDispatch();
  const { getQueryParam } = useNavigateWithQueryParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<CompanyFormValues>({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    country: "",
    type: getQueryParam('type') || '',
    isDefault: true,
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<CompanyFormValues>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyFormValues> = {};

    if (!formValues.name) newErrors.name = "Company Name is required.";
    if (!formValues.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formValues.contact) newErrors.contact = "Phone number is required.";
    if (!formValues.address) newErrors.address = "Address is required.";
    if (!formValues.city) newErrors.city = "City is required.";
    if (!formValues.state) newErrors.state = "State is required.";
    if (!formValues.pincode) newErrors.pincode = "Pincode is required.";
    if (!formValues.country) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await dispatch(postCompanyDetails(formValues));
      navigate(`/${getQueryParam('type')?.toLowerCase() || ''}`);
    }
  };

  if (!getQueryParam('type')) return null;

  return (
    <div 
      className="min-h-screen flex flex-col bg-[url('/images/test5.avif')] bg-cover bg-center " 
    >
      <Navbar />
      <h2 className="text-3xl font-bold pt-20 md:pt-32 pl-4 md:pl-12 font-nunito text-white">Let's start with your company details</h2>
      <div className="flex flex-col md:flex-row mt-2 font-nunito p-4 md:p-10">
        <div className="grow basis-0 p-4">
          {[
            { label: "Company name", name: "name", type: "text", required: true },
            { label: "Company email(or you personal email)", name: "email", type: "email", required: true },
            { label: "Company phone number(or your personal phone number)", name: "contact", type: "text", required: true },
          ].map(({ label, name, type, required }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block mb-1 text-md font-medium text-white">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={(formValues as never)[name]}
                onChange={handleChange}
                className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors[name as keyof CompanyFormValues] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name as keyof CompanyFormValues] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof CompanyFormValues]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grow basis-0 p-4">
          {[
            { label: "Address", name: "address", type: "text", required: true },
            { label: "City", name: "city", type: "text", required: true },
            { label: "State", name: "state", type: "text", required: true },
            { label: "Pincode", name: "pincode", type: "text", required: true },
          ].map(({ label, name, type, required }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block mb-1 text-md font-medium text-white">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={(formValues as never)[name]}
                onChange={handleChange}
                className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors[name as keyof CompanyFormValues] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name as keyof CompanyFormValues] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof CompanyFormValues]}
                </p>
              )}
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="country" className="block mb-1 text-sm font-medium text-white">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              id="country"
              value={formValues.country}
              onChange={handleChange}
              className={`bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="hidden lg:block grow basis-0 p-4">
          <img src="/images/company.png" className="relative -top-10" /> 
        </div>
      </div>
    </div>
  )
}
