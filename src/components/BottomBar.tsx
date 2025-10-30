import { CiCirclePlus } from 'react-icons/ci'
import { useRef, useState, type FC } from 'react'
import axiosInstance from '../lib/AxiosInstance'
// import { FiSend } from 'react-icons/fi'
// import { IoIosSend } from 'react-icons/io'
import { IoClose, IoSend } from 'react-icons/io5'

// TODO: Зробити фукцію для передачі тексту та фото на бекенд

interface Page {
  title: string
  text: string
  analogy: string | null
}

interface BottomBarProps {
  setCaption: (caption: string) => void
  setLoading: (loading: boolean) => void
  setAiPages: (pages: Page[]) => void
  setCurrentPage: (page: number) => void
}

const BottomBar: FC<BottomBarProps> = ({
  setCaption,
  setLoading,
  setAiPages,
  setCurrentPage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [textValue, setTextValue] = useState<string>('')
  const [imagePrev, setImagePrev] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      if (imagePrev) {
        URL.revokeObjectURL(imagePrev)
      }

      setImagePrev(URL.createObjectURL(file))
      setImage(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      setCaption('Помилка завантаження файлу.')
    }
  }

  const removeImage = () => {
    setImage(null)
    if (imagePrev) {
      URL.revokeObjectURL(imagePrev)
    }
    setImagePrev(null)
  }

  const handleSubmit = async () => {
    if (!textValue && !image) return

    try {
      const data = new FormData()
      if (image) {
        data.append('image', image)
      }
      data.append('text', textValue)

      setLoading(true)
      setCaption('Аналізую запит...')
      setAiPages([])

      const res = await axiosInstance.post('/api/understand-image', data)

      if (res.data && Array.isArray(res.data.pages)) {
        setAiPages(res.data.pages)
        setCurrentPage(0)
        setCaption('')
        setTextValue('')
        removeImage()
      } else {
        setCaption('Отримано дивну відповідь від сервера.')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
      setCaption('Помилка обробки запиту.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className="
      absolute bottom-4 left-1/2 w-[95%] max-w-3xl h-16 sm:h-20 
      bg-gray-800 bg-opacity-90 backdrop-blur-md 
      border border-gray-700 rounded-xl shadow-2xl
      flex items-center 
      px-2 sm:px-4 
      transform -translate-x-1/2 
      space-x-2 sm:space-x-3
    "
    >
      <div
        className="
        flex-shrink-0 
        relative bg-gradient-to-r from-blue-600 to-indigo-600 
        p-2 sm:p-3 rounded-full cursor-pointer 
        hover:from-blue-500 hover:to-indigo-500 transition-colors shadow-lg
      "
        onClick={handleUploadClick}
      >
        <input
          type="file"
          className="absolute hidden inset-0"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <CiCirclePlus size={24} sm:size={28} className="text-white" />
      </div>

      <div
        className="
        flex-1 flex items-center h-10 sm:h-12 
        bg-gray-700 border border-gray-600 rounded-lg 
        px-2 sm:px-3 space-x-1 sm:space-x-2
      "
      >
        {imagePrev && (
          <div
            className="
            flex-shrink-0 bg-gray-800 p-0.5 rounded-md 
            flex items-center space-x-1 sm:space-x-1.5
          "
          >
            <img
              src={imagePrev}
              alt="Preview"
              className="h-6 w-6 sm:h-7 sm:w-7 object-cover rounded-sm"
            />
            <button
              onClick={removeImage}
              className="text-gray-400 hover:text-white pr-0.5"
            >
              <IoClose size={16} sm:size={18} />
            </button>
          </div>
        )}

        <input
          type="text"
          className="
          flex-1 h-full bg-transparent border-none 
          text-white placeholder-gray-400 text-sm sm:text-base
          focus:outline-none focus:ring-0
        "
          placeholder={imagePrev ? 'Опис до фото...' : 'Введіть ваш запит...'}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="
        flex-shrink-0 bg-blue-600 hover:bg-blue-700 
        text-white h-10 w-10 sm:h-12 sm:w-12 
        flex items-center justify-center 
        rounded-lg shadow-lg transition-colors
        disabled:bg-gray-500
      "
        disabled={!textValue && !imagePrev}
      >
        <IoSend size={20} />
      </button>
    </div>
  )
}

export default BottomBar
