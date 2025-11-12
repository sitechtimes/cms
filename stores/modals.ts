export const useModalStore = defineStore('modals', () => {
  const modal1 = useTemplateRef('modal1')
  const modal2 = useTemplateRef('modal2')
  const modal3 = useTemplateRef('modal3')
  const modal4 = useTemplateRef('modal4')

  const dropdown = useTemplateRef('dropdown')

  function closeDropdown() {
    dropdown.value?.removeAttribute('open')
  }

  function confirmSend() {
    closeDropdown()
    modal2.value?.showModal()
  }

  function confirmReady() {
    closeDropdown()
    modal4.value?.showModal()
  }

  function confirmPublish() {
    closeDropdown()
    modal3.value?.showModal()
  }

  function confirmArticleDeletion() {
    closeDropdown()
    modal1.value?.showModal()
  }

  return {
    confirmSend,
    confirmArticleDeletion,
    confirmPublish,
    confirmReady,
    closeDropdown,
    modal1,
    modal2,
    modal3,
    modal4,
  }
})
