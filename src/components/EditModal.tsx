import React, { useState, useEffect } from 'react' // Додаємо useState та useEffect
import type { CircuitComponent } from '../App'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => void
  onSave: (id: string, newValue: number) => void
  component: CircuitComponent | null
}

const EditModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  component,
}: EditModalProps) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    if (component) {
      setCurrentValue(component.value || 0)
    }
  }, [component])

  if (!isOpen || !component) {
    return null
  }

  const handleSave = () => {
    onSave(component.id, currentValue)
    onClose()
  }

  const handleDelete = () => {
    onDelete(component.id)
    onClose()
  }

  return (
    <div
      className={`absolute ${
        isOpen ? 'block' : 'hidden'
      }  top-1/2 left-1/2 h-auto w-96 bg-white transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg shadow-xl`}
    >
      <h2 className="text-black text-center text-xl font-bold mb-4">
        Налаштування: {component.label}
      </h2>

      <div className="flex flex-col items-center justify-center">
        <label className="text-black mb-4 w-full">
          Значення (Value):
          <input
            type="number"
            value={currentValue}
            className="ml-2 p-1 border border-gray-300 rounded w-full mt-1 text-black"
            onChange={(e) => setCurrentValue(Number(e.target.value))}
          />
        </label>

        <div className="flex justify-between w-full mt-4 space-x-2">
          <button
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Видалити
          </button>
          <button
            className="flex-1 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Скасувати
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
