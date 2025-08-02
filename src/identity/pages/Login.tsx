import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../app/actions/identity/auth";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import FormComponent from "../../shared/components/Form/FormComponent";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: { username: string, password: string }) => {
    const [err, data] = await dispatch(loginUser(formValues));
    if (err) return;

    navigate(data?.landingUrl || "");
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center" 
    >
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="flex max-w-lg w-full bg-white bg-opacity-80 rounded-lg shadow-lg p-6 relative">
          <div className="w-full  flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-center text-primary">Log in</h2>
            <p className="text-center text-gray-700 mb-4 text-sm">Your next step is just a click away.</p>
            <FormComponent
              schema={[
                { label: "Username", name: "username", type: "text", initValue: "", placeholder: 'Enter your username' },
                { label: "Password", name: "password", type: "password", initValue: "", placeholder: 'Enter your password' }
              ]}
              submitBtnBgColor="#04102B"
              onFormSubmit={handleSubmit}              
            />
          </div>
        </div>
      </div>
    </div>
  );
}
