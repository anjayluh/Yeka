'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProgramFormProps {
  initialData?: {
    mode: string;
    time_frame: number;
    description: string;
    activities: string;
    bonus_materials: string;
    fee: number;
  };
  onSubmit: (program: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const ProgramForm = ({
  initialData = {
    mode: '',
    time_frame: 0,
    description: '',
    activities: '',
    bonus_materials: '',
    fee: 0,
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: ProgramFormProps) => {
  const [program, setProgram] = useState(initialData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgram((prev) => {
      const updatedProgram = {
        ...prev,
        [name]: value,
      };
      checkIfFormChanged(updatedProgram);
      return updatedProgram;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!program.mode) {
      console.error('Mode is a required fields are required fields');
      return;
    }
    onSubmit(program);
  };

  const handleCancel = () => {
    router.back();
  };

  const checkIfFormChanged = (updatedProgram: any) => {
    setIsFormChanged(JSON.stringify(updatedProgram) !== JSON.stringify(initialData));
  };

  useEffect(() => {
    checkIfFormChanged(program);
  }, [program]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] p-6 max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
              Program Mode
            </label>
            <input
              id="mode"
              type="text"
              name="mode"
              value={program.mode}
              onChange={handleInputChange}
              placeholder="Program Mode"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Time Frame" className="block text-sm font-medium text-gray-700">
              Time Frame (Minutes)
            </label>
            <input
              id="time_frame"
              type="number"
              name="time_frame"
              value={program.time_frame}
              onChange={handleInputChange}
              placeholder="Time Frame"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={program.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              aria-label="Description"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="bonus_materials" className="block text-sm font-medium text-gray-700">
              Bonus Materials
            </label>
            <input
              id="bonus_materials"
              type="text"
              name="bonus_materials"
              value={program.bonus_materials}
              onChange={handleInputChange}
              placeholder="Bonus Materials"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
              Fee
            </label>
            <input
              id="fee"
              type="number"
              name="fee"
              value={program.fee}
              onChange={handleInputChange}
              placeholder="Fee"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md hover:bg-green-700 ${isFormChanged
                ? 'bg-green-600'
                : 'bg-gray-200 cursor-not-allowed hover:bg-gray-200'
                }`}
              disabled={!isFormChanged}
            >
              {submitButtonText}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
