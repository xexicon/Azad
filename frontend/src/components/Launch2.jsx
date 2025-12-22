import React from 'react';

const Launch2 = ({ data, setData, onBack, onSubmit }) => {
  const [selected, setSelected] = React.useState(data.launch_quarter || "");

  const handleQuarterChange = (e) => {
    setSelected(e.target.value);
    setData({ ...data, launch_quarter: e.target.value });
  };

  return (
    <div className="w-full flex justify-center">
      {/* Card */}
      <div
        className="
          w-full
          sm:w-96
          mt-10
          bg-zinc-300/0
          rounded-2xl
          border border-white/70
          flex justify-center
        "
      >
        <div className="flex flex-col gap-4 items-center w-full px-4 sm:px-0">

          {/* Payload */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
              Payload Mass*
            </div>
            <input
              type="text"
              placeholder="eg: 2kg"
              value={data.payload}
              onChange={e => setData({ ...data, payload: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
              required
            />
          </div>

          {/* Launch Quarter */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Launch Quarter*
            </div>
            <select
              value={selected}
              onChange={handleQuarterChange}
              className={`
                px-4 py-2
                w-full sm:w-80
                bg-[rgba(4,4,4,1)]
                rounded-md
                font-inter font-extralight
                border border-white/70
                focus:outline-none focus:border-white/30
                ${selected === "" ? "text-white/30" : "text-white"}
              `}
            >
              <option value="" disabled hidden>
                Select from the dropdown
              </option>
              <option value="2026 Q4">2026 Q4</option>
              <option value="2027 Q1">2027 Q1</option>
              <option value="2027 Q2">2027 Q2</option>
              <option value="2027 Q3">2027 Q3</option>
            </select>
          </div>

          {/* Target Altitude */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Target Altitude*
            </div>
            <input
              type="text"
              placeholder="eg: 8km"
              value={data.target_altitude}
              onChange={e => setData({ ...data, target_altitude: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <button
              className="
                w-28 h-10
                mt-5 mb-2 sm:mb-5
                bg-zinc-300/0
                rounded-md
                border border-white/70
                text-white
                cursor-pointer
              "
              onClick={onBack}
            >
              Back
            </button>

            <button
              className="
                w-28 h-10
                mt-0 sm:mt-5 mb-5
                bg-zinc-300/0
                rounded-md
                border border-white/70
                text-white
                cursor-pointer
              "
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Launch2;
