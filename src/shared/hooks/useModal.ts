import { useCallback, useEffect, useState } from "react"

interface UseModalProps {
  openOnMount?: boolean
}

export const useModal = ({ openOnMount = false }: UseModalProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  useEffect(() => {
    if (openOnMount) {
      handleModalOpen()
    }
  }, [openOnMount, handleModalOpen])

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  }
}
