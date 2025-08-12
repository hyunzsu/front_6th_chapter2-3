// UI 상태 관련
export interface DialogState {
  isOpen: boolean
}

export interface SelectionState<T> {
  selectedItem: T | null
}

export interface LoadingState {
  isLoading: boolean
}
