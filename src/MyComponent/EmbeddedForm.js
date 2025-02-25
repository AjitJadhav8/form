import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SwimmerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [location, setLocation] = useState("");
  const [numSwimmers, setNumSwimmers] = useState(0);

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Swimmer Registration Form</h2>
      {location && (
        <div className="mb-4 text-green-600 font-semibold">
          Selected Location: {location}
        </div>
      )}
      {numSwimmers > 0 && (
        <div className="mb-4 text-blue-600 font-semibold">
          Number of Swimmers: {numSwimmers}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Location Selection */}
        <div>
          <label className="block font-medium">Select Location</label>
          <select
            {...register("location", { required: "Location is required" })}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choose Location --</option>
            <option value="Pool A">Pool A</option>
            <option value="Pool B">Pool B</option>
            <option value="Pool C">Pool C</option>
          </select>
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Number of Swimmers */}
        {location && (
          <div>
            <label className="block font-medium">Number of Swimmers</label>
            <select
              {...register("numSwimmers", { required: "Please select number of swimmers" })}
              onChange={(e) => setNumSwimmers(parseInt(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select --</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.numSwimmers && (
              <p className="text-red-500">{errors.numSwimmers.message}</p>
            )}
          </div>
        )}

        {/* Swimmer Age Selection with Styled Boxes */}
        {numSwimmers > 0 && (
          <div className="space-y-4">
            {[...Array(numSwimmers)].map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Swimmer #{index + 1}
                </h3>
                <label className="block font-medium mb-1">Child's Age</label>
                <select
                  {...register(`swimmerAge${index + 1}`, {
                    required: "Age is required",
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select Age --</option>
                  {[...Array(18)].map((_, age) => (
                    <option key={age + 1} value={age + 1}>
                      {age + 1}
                    </option>
                  ))}
                </select>
                {errors[`swimmerAge${index + 1}`] && (
                  <p className="text-red-500">
                    {errors[`swimmerAge${index + 1}`].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        {numSwimmers > 0 && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default SwimmerForm;
