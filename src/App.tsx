import { useState, type DragEvent } from 'react'
import Toolbox from './components/Toolbox'
import EditModal from './components/EditModal'
import CanvasNode from './components/CanvasNode'
import BottomBar from './components/BottomBar'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'


export interface CircuitComponent {
  id: string
  type: string
  label: string
  value?: number
  position: { x: number; y: number }
}

interface Page {
  title: string
  text: string
  analogy: string | null
}

function App() {
  const [circuitComponents, setCircuitComponents] = useState<
    CircuitComponent[]
  >([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingComponent, setEditingComponent] =
    useState<CircuitComponent | null>(null)
  const [aiCaption, setAiCaption] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiPages, setAiPages] = useState<Page[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const handleOpenModal = (component: CircuitComponent) => {
    setEditingComponent(component)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingComponent(null)
  }

  const handleSaveValue = (id: string, newValue: number) => {
    setCircuitComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, value: newValue } : comp))
    )
    handleCloseModal()
  }

  const handleDeleteComponent = (id: string) => {
    setCircuitComponents((prev) => prev.filter((comp) => comp.id !== id))
    handleCloseModal()
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const canvasStyle: React.CSSProperties = {
    backgroundImage: 'radial-gradient(circle, #4a5568 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0',
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('componentType')
    if (!type) return

    const canvasRect = e.currentTarget.getBoundingClientRect()
    const position = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    }

    const newComponent: CircuitComponent = {
      id: `${type}-${Date.now()}`,
      type: type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
        circuitComponents.length + 1
      }`,
      value: type === 'resistor' || type === 'voltageDC' ? 100 : 0,
      position: position,
    }
    setCircuitComponents((prev) => [...prev, newComponent])
  }

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white overflow-hidden">
      <Toolbox />
      <main
        className="flex-1 relative h-full"
        style={canvasStyle}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {circuitComponents.map((comp) => (
          <CanvasNode
            key={comp.id}
            component={comp}
            onOpenModal={handleOpenModal}
          />
        ))}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-10 !w-10 !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        {aiPages.length > 0 ? (
          <div
            className="
        absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl 
        bg-gray-800 bg-opacity-95 backdrop-blur-sm border border-gray-700 
        p-6 rounded-lg shadow-2xl z-50 
        flex flex-col max-h-[70vh]
      "
          >
            <div className="flex-grow overflow-y-auto pr-2">
              <h2 className="font-bold text-2xl text-blue-300 mb-3">
                {aiPages[currentPage].title}
              </h2>

              <p className="text-base text-gray-200 leading-relaxed">
                {aiPages[currentPage].text}
              </p>

              {aiPages[currentPage].analogy && (
                <div
                  className="
              mt-4 bg-gray-900 bg-opacity-70 p-4 rounded-md 
              border-l-4 border-blue-400 italic
            "
                >
                  <strong className="font-semibold text-gray-300 not-italic">
                    Аналогія:
                  </strong>
                  <span className="text-gray-300">
                    {' '}
                    {aiPages[currentPage].analogy}
                  </span>
                </div>
              )}
            </div>

            <div
              className="
          flex items-center justify-between w-full 
          mt-6 pt-4 border-t border-gray-700
        "
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 0}
                  className="
              bg-blue-600 text-white p-2 rounded-full 
              hover:bg-blue-700 transition-colors 
              disabled:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed
            "
                  aria-label="Previous Page"
                >
                  <GrFormPreviousLink size={20} />
                </button>

                <span className="text-gray-300 font-semibold text-sm tabular-nums">
                  {currentPage + 1} / {aiPages.length}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === aiPages.length - 1}
                  className="
              bg-blue-600 text-white p-2 rounded-full 
              hover:bg-blue-700 transition-colors 
              disabled:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed
            "
                  aria-label="Next Page"
                >
                  <GrFormNextLink size={20} />
                </button>
              </div>

              {currentPage === aiPages.length - 1 && (
                <button
                  className="
              ml-4 px-4 py-2 bg-red-600 text-white 
              text-sm font-medium rounded-md hover:bg-red-700 transition-colors
            "
                  onClick={() => setAiPages([])}
                >
                  Закрити
                </button>
              )}
            </div>
          </div>
        ) : aiCaption ? (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl bg-gray-700 p-4 rounded-lg shadow-xl z-50">
            <h3 className="font-bold text-lg text-blue-300 mb-2">
              Пояснення від ШІ:
            </h3>
            <p className="text-sm">{aiCaption}</p>
            <button
              onClick={() => setAiCaption('')}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        ) : null}
      </main>
      <BottomBar
        setCaption={setAiCaption}
        setLoading={setLoading}
        setAiPages={setAiPages}
        setCurrentPage={setCurrentPage}
      />
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveValue}
        onDelete={handleDeleteComponent}
        component={editingComponent}
      />
    </div>
  )
}

export default App
