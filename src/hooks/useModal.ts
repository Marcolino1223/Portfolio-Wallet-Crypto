import { useState } from "react"

export const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    function showModal() {
        setModalIsOpen(true)
    }
    function closeModal() {
        setModalIsOpen(false)
    }

    const [modalIsOpenVenda, setModalIsOpenVenda] = useState(false)

    function showModalVenda() {
        setModalIsOpenVenda(true)
    }
    function closeModalVenda() {
        setModalIsOpenVenda(false)
    }

    return {
        modalIsOpen,
        showModal,
        closeModal,
        modalIsOpenVenda,
        showModalVenda,
        closeModalVenda
    }
}