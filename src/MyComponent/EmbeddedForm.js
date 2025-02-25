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
  const [questions, setQuestions] = useState({});
  const [levels, setLevels] = useState({});

  const onSubmit = (data) => {
    console.log("Form Submitted", data, levels);
    alert("Form Submitted Successfully!");
  };

  const handleAgeSelection = (age, index) => {
    if (age >= 3) {
      setQuestions((prev) => ({
        ...prev,
        [index]: { step: 1, maxStep: age === 3 ? 3 : age === 4 ? 4 : 0 },
      }));
    } else {
      setLevels((prev) => ({
        ...prev,
        [index]: "No level assigned (Age below 3)",
      }));
    }
  };

  const handleQuestion = (answer, index) => {
    const currentStep = questions[index].step;
    const maxStep = questions[index].maxStep;

    if (currentStep <= maxStep) {
      if (answer === "no") {
        const level = `Junior-${currentStep}`;
        setLevels((prev) => ({ ...prev, [index]: level }));
      } else if (currentStep === maxStep) {
        setLevels((prev) => ({ ...prev, [index]: "Advanced" }));
      } else {
        setQuestions((prev) => ({
          ...prev,
          [index]: { ...questions[index], step: currentStep + 1 },
        }));
      }
    }
  };

  const questionsList = [
    "Can your child swim 5 feet independently with their face in the water without wearing or using a flotation device?",
    "Can your child swim more than 10 feet independently with their face in the water without wearing or using a flotation device?",
    "Does your child independently roll over onto their back for a breath or lift their head straight up for the breath?",
    "Can your child swim 1 width efficiently while using Simple Freestyle arms?",
  ];

  return (
    <div className="form-container">
      <h2 className="form-title">Swimmer Registration Form</h2>
      {location && <div>Selected Location: <strong>{location}</strong></div>}
      {numSwimmers > 0 && <div>Number of Swimmers: <strong>{numSwimmers}</strong></div>}

      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        {/* Location Selection */}
        <div className="form-group">
          <label>Select Location</label>
          <select
            {...register("location", { required: "Location is required" })}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- Choose Location --</option>
            <option value="Pool A">Pool A</option>
            <option value="Pool B">Pool B</option>
            <option value="Pool C">Pool C</option>
          </select>
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        {/* Number of Swimmers */}
        {location && (
          <div className="form-group">
            <label>Number of Swimmers</label>
            <select
              {...register("numSwimmers", { required: "Please select number of swimmers" })}
              onChange={(e) => setNumSwimmers(parseInt(e.target.value))}
            >
              <option value="">-- Select --</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.numSwimmers && <p>{errors.numSwimmers.message}</p>}
          </div>
        )}

        {/* Swimmer Age Selection and Conditional Questions */}
        {numSwimmers > 0 &&
          [...Array(numSwimmers)].map((_, index) => (
            <div key={index} className="swimmer-card">
              <h3>Swimmer #{index + 1}</h3>
              <label>Child's Age</label>
              <select
                {...register(`swimmerAge${index + 1}`, {
                  required: "Age is required",
                  onChange: (e) => handleAgeSelection(parseInt(e.target.value), index),
                })}
              >
                <option value="">-- Select Age --</option>
                {[...Array(18)].map((_, age) => (
                  <option key={age + 1} value={age + 1}>
                    {age + 1}
                  </option>
                ))}
              </select>
              {errors[`swimmerAge${index + 1}`] && (
                <p>{errors[`swimmerAge${index + 1}`].message}</p>
              )}

              {/* Conditional Questions */}
              {questions[index] && questions[index].step && (
                <div>
                  <p>{questionsList[questions[index].step - 1]}</p>
                  <button type="button" onClick={() => handleQuestion("yes", index)}>Yes</button>
                  <button type="button" onClick={() => handleQuestion("no", index)}>No</button>
                </div>
              )}

              {levels[index] && <p>Assigned Level: {levels[index]}</p>}
            </div>
          ))}

        {/* Submit Button */}
        {numSwimmers > 0 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default SwimmerForm;
