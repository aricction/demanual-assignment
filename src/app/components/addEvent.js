"use client";
import { useState } from "react";

const AddEventModal = ({ open, onClose, onAddEvent }) => {
  const [title, setTitle] = useState("");

  if (!open) return null; 

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddEvent(title); 
    setTitle("");
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="w-full border px-2 py-1 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
