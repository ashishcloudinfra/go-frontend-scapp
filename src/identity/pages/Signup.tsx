import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../components/Navbar';
import { postCompanyDetails, signupUser } from '../../app/actions/identity/auth';
import useNavigateWithQueryParams from '../../hooks/useNavigateWithQueryParams';

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
  role: string;
  permissions: string;
  plans: string;
  companyId: string;
}

export default function SignupPage() {
  const companyTypes = useAppSelector(s => s.companyTypes.data);
  const { getQueryParam } = useNavigateWithQueryParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<SignupFormValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    role: getQueryParam('role') || 'admin',
    permissions: '',
    plans: '',
    companyId: '',
  });
  const [selectedCompanyType, setSelectedCompanyType] = useState(getQueryParam('type') || '');
  const [errors, setErrors] = useState<Partial<SignupFormValues>>({});

  const skipCompanyDetailsStep = useMemo(() => ['PersonalFinance'].includes(selectedCompanyType), [selectedCompanyType]);

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormValues> = {};

    if (!selectedCompanyType) {
      alert('Select company type')
      return false;
    }

    if (!formValues.firstName) newErrors.firstName = "First name is required.";
    if (!formValues.lastName) newErrors.lastName = "Last name is required.";
    if (!formValues.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formValues.username) newErrors.username = "Username is required.";
    if (!formValues.password) newErrors.password = "Password is required.";
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formValues.contact) newErrors.contact = "Contact number is required.";

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
      const [err, token] = await dispatch(signupUser(formValues));
      if (err) {
        console.log(err);
        return;
      }
      localStorage.setItem('sctoken', token);

      if (!skipCompanyDetailsStep) {
        navigate(`/company-details?type=${getQueryParam('type')}`);
        return;
      }
      const [companyErr] = await dispatch(postCompanyDetails({
        name: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        state: "",
        country: "",
        type: selectedCompanyType,
        isDefault: true,
        pincode: "",
      }));
      if (companyErr) {
        console.log(companyErr);
        // delete user from db
        return;
      }
      window.location.href = `${window.location.origin}/${getQueryParam('type')?.toLowerCase() || ''}`;
      return;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center" 
    >
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="flex max-w-lg w-full bg-white bg-opacity-80 rounded-lg shadow-lg p-6 relative">
          <div className="w-full  flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-center text-primary">Sign up</h2>
            <p className="text-center text-gray-700 mb-4 ">Tell us about yourself</p>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
             
              {/* First Name and Last Name in the same row */}
              <div className="grid grid-cols-2 gap-4 mb-4 ">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder='Your first name'
                    className={`w-full p-2 border rounded-lg ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder='Your last name'
                    value={formValues.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Other fields */}
              {[
                { label: "Email", name: "email", type: "email", placeholder: 'Enter your email' },
                { label: "Username", name: "username", type: "text", placeholder: 'Enter your username' },
                { label: "Password", name: "password", type: "password", placeholder: 'Enter your password' },
                { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: 'Confirm your password' },
                { label: "Contact", name: "contact", type: "text", placeholder: 'Enter your contact address' },
              ].map(({ label, name, type = "text", placeholder }) => (
                <div className="mb-4" key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={(formValues as never)[name]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors[name as keyof SignupFormValues]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[name as keyof SignupFormValues] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof SignupFormValues]}
                    </p>
                  )}
                </div>
              ))}

              <div className="mb-4">
                <label htmlFor="type" className="block mb-2 text-sm font-medium">
                  Company type
                </label>
                <select
                  name="type"
                  id="type"
                  value={selectedCompanyType}
                  onChange={(e) => setSelectedCompanyType(e.target.value)}
                  className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                >
                  <option value="">Select your company type</option>
                  {companyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-primary text-white rounded-lg scale-light"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
