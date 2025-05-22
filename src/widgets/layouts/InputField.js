import { TextField, Input, Button } from "react-aria-components";
import { useFormContext } from "react-hook-form";

function InputField({
  label,
  description,
  name,
  fieldId,
  message,
  isDisabled = false,
  isRequired = false,
  errorText,
  customStyle = "",
  visible = false,
  showIcon = false,
  handleChange,
  isReadOnly = false,
  labelLeft = false,
  placeHolder = " ",
  input_type = "text",
  options = [],
  ...props
}) {
  const leftLabelCss = labelLeft ? "flex gap-4 w-full items-start" : "";

  const {
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const filedName = name || "";
  const fieldErrors = errors;

  // Safely extract the error message
  const errorMessage = fieldErrors[filedName]?.message;
  const errorString =
    typeof errorMessage === "string"
      ? errorMessage
      : errorMessage instanceof Object && "message" in errorMessage
        ? (errorMessage).message
        : "";

  const error = errorString || errorText || "";
  const value = getValues(filedName) || "";

  return (
    <TextField {...props} isInvalid={!!error} className={`${leftLabelCss}`}>
      <div className="grid grid-cols-1">
        {/* <Label className="font-medium text-sm text-gray-400">{label}</Label> */}
        <div className="flex items-center border border-[#D0E2FF80] bg-white rounded-[3px] px-2 md:rounded-normal focus:outline-none">
          <Input
            autoComplete="off"
            value={value}
            disabled={isDisabled}
            className={`w-full text-primary focus:outline-none placeholder:font-light placeholder:text-xs h-[40px] md:h-[42px] ${customStyle} ${isDisabled ? "cursor-not-allowed bg-gray-300" : ""
              }`}
            placeholder={placeHolder}
            onChange={(e) => {
              clearErrors(filedName);
              setValue(filedName, e.target.value);
            }}
            readOnly={isReadOnly}
            id={fieldId}
          />
          {visible && (
            <Button onPress={handleChange} className="focus:outline-none">
              <img
                src={showIcon ? "/icons/eye.png" : "/icons/eye-slash.svg"}
                alt="visible"
                className="h-5 w-5 focus:outline-none"
              />
            </Button>
          )}
        </div>
        {(error || message) && (
          <div
            className={`bg-transparent flex items-center gap-2 rounded-md mt-2 ${message === "Unknown error occurred" ||
              message === "Incorrect password"
              ? "hidden"
              : ""
              }`}
          >
            <img
              src="/icons/error.svg"
              alt="error"
              className="w-[16px] h-[16px]"
            />
            {message && (
              <span className="text-[#DC2626] text-xs leading-[16px] w-full font-normal">
                {message === "Incorrect password"
                  ? "Incorrect password, please try again!"
                  : message}
              </span>
            )}
            {error && (
              <span className="text-[#DC2626] text-xs leading-[16px] font-normal">
                {error}
              </span>
            )}
            {message === "Email already registered" && (
              <div className="w-full text-gray-400 text-[12px] md:text-[12px] font-medium	md:font-medium text-end mb-4 md:my-4 leading-5">
                <a href="/forgot-password" className=" text-[#4589FF] mx-1">
                  Forgot Password?
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </TextField>
  );
}

export default InputField;
