import type { Component, InjectionKey } from 'vue'

interface ModalState {
  component: Component | null
  props: Record<string, any>
}

export const modalInjectionKey: InjectionKey<ModalState> = Symbol('modal')

export const _modalState: ModalState = reactive({
  component: null,
  props: {},
})

const _isOpen = ref(false)

export function useModal() {
  return {
    isOpen: _isOpen,
    open(component: Component, componentProps?: Record<string, any>) {
      _modalState.component = markRaw(component)
      _modalState.props = componentProps || {}
      _isOpen.value = true
    },
    close() {
      _isOpen.value = false
    },
  }
}
